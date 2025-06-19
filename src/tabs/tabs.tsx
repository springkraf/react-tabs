import { MantineProvider, Menu } from '@mantine/core';
import '@mantine/core/styles.css';
import { useElementSize, useResizeObserver } from '@mantine/hooks';
import classNames from 'classnames';
import {
  type DragEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import DotsSvgIcon from '../assets/dots.svg';
import DefaultScrollArea from '../default-scroll-area';
import { NavigationTabSizeContext } from './context';
import Separator from './seperator';
import ShowMore from './show-more';
import styles from './styles.module.css';
import TabItem from './tab-item';
import type {
  DragInfo,
  NavigationTabItemProps,
  TabProps,
  TabStateProps,
} from './types';
import { handleDragOver, handleDragStart, onDragEnd } from './utils';

export default function ReactTabs(props: TabProps) {
  const {
    items = [],
    onRemove,
    activeKey,
    onChange,
    renderLeft,
    renderRight,
    onResizing,
    onReorder,
    className,
    iconColors = { close: '#099CFF', dots: '#099CFF' },
    variant = 'normal',
  } = props;
  const currentRef = useRef<HTMLDivElement | null>(null);
  const [isShowMore, setIsShowMore] = useState<boolean>(false);
  const [{ tabDimension, totalTabsWidth }, setState] = useState<TabStateProps>({
    tabDimension: [],
    totalTabsWidth: 0,
  });
  const prevTabLength = useRef<number>(0);
  const prevAvailableSize = useRef<number>(0);
  const tabRefs = useRef<HTMLDivElement[]>([]);
  const renderLeftRef = useRef<HTMLDivElement | null>(null);
  const renderRightRef = useRef<HTMLDivElement | null>(null);
  const isCompact = variant === 'compact';

  const [draggedInfo, setDraggedInfo] = useState<DragInfo>({
    index: null,
    isVisible: true,
  });
  const [dropTargetInfo, setDropTargetInfo] = useState<DragInfo>({
    index: null,
    isVisible: true,
  });

  const init = useCallback(() => {
    let tabsTotalWidth = 0;
    const tabDimension: number[] = [];
    (tabRefs?.current || []).forEach((value) => {
      const width = value.offsetWidth;
      tabsTotalWidth += Number(width);
      tabDimension.push(width);
    });
    setState({
      tabDimension,
      totalTabsWidth: tabsTotalWidth,
    });
  }, []);

  useEffect(() => {
    tabRefs.current = tabRefs.current?.slice(0, items.length);
  }, [items, tabRefs]);

  useEffect(() => {
    init();
  }, [init, items]);

  const getTabs = useCallback(
    (width: number) => {
      const availableWidth = width - (totalTabsWidth > width ? 10 : 0);
      const visible: NavigationTabItemProps[] = [];
      const invisible: NavigationTabItemProps[] = [];
      let usedWidth = 48;
      onResizing?.({
        width: availableWidth,
        isChanged: prevAvailableSize.current !== availableWidth,
      });
      if (prevTabLength.current !== items.length) {
        setIsShowMore(false);
      }
      prevAvailableSize.current = availableWidth;
      prevTabLength.current = items.length;
      for (let i = 0; i < items.length; i++) {
        const prevUsedWidth = usedWidth;
        usedWidth += tabDimension[i];
        if (availableWidth - prevUsedWidth > tabDimension[i]) {
          visible.push(items[i]);
        } else {
          invisible.push(items[i]);
        }
      }
      return { visible, invisible };
    },
    [items, prevTabLength, tabDimension, totalTabsWidth, onResizing],
  );

  const activeItem = useMemo(() => {
    return items.filter((item) => item.key === activeKey)?.[0];
  }, [activeKey, items]);

  const onHandleChange = useCallback(
    (key: string) => {
      init();
      onChange(key);
    },
    [init, onChange],
  );

  const onHandleRemove = useCallback(
    (key: string) => {
      init();
      onRemove(key);
    },
    [init, onRemove],
  );

  const {
    width: tempWidth,
    height: tempHeight,
    ref: containerRef,
  } = useElementSize();

  const width =
    (tempWidth || 0) -
    (renderLeftRef.current?.offsetWidth || 0) -
    (renderRightRef.current?.offsetWidth || 0);

  const { visible, invisible } = getTabs(width);

  const visibleKey = useMemo(() => visible.map((item) => item.key), [visible]);

  const invisibleKey = useMemo(
    () => invisible.map((item) => item.key),
    [invisible],
  );

  const handleDrop = useCallback(
    (e: DragEvent, dropIndex: number, isDropVisible: boolean) => {
      e.preventDefault();

      if (draggedInfo.index === null) return;

      const { visible } = getTabs(width);
      const newItems = [...items];

      let sourceIndex = draggedInfo.index;
      let targetIndex = dropIndex;

      if (!draggedInfo.isVisible) {
        sourceIndex = visible.length + sourceIndex;
      }

      if (!isDropVisible) {
        targetIndex = visible.length + targetIndex;
      }

      if (sourceIndex === targetIndex) {
        setDraggedInfo({ index: null, isVisible: true });
        setDropTargetInfo({ index: null, isVisible: true });
        return;
      }

      const [draggedItem] = newItems.splice(sourceIndex, 1);
      newItems.splice(targetIndex, 0, draggedItem);

      setDraggedInfo({ index: null, isVisible: true });
      setDropTargetInfo({ index: null, isVisible: true });

      onReorder?.(newItems);
      init();
    },
    [
      draggedInfo.index,
      draggedInfo.isVisible,
      getTabs,
      init,
      items,
      onReorder,
      width,
    ],
  );
  const [showMoreButtonRef, showMoreButtonRect] = useResizeObserver();

  const invisibleIsActive =
    !!invisibleKey.length && activeKey && invisibleKey.includes(activeKey);

  const tabItemClassName = useCallback(
    (item: NavigationTabItemProps, isInvisible: boolean) => {
      return {
        ...item,
        className: {
          ...item.className,
          tabActive: classNames(
            item.className?.tabActive,
            className?.tabItem?.active,
          ),
          tab: classNames(
            isInvisible && styles.tab__invisibleTab,
            className?.tabItem?.base,
            item.className?.tab,
          ),
          pulseBar: classNames(
            className?.tabItem?.pulseBar,
            item.className?.pulseBar,
          ),
        },
      };
    },
    [className?.tabItem],
  );

  return (
    <MantineProvider>
      <div
        className={classNames(styles.tab__root_container, className?.container)}
        onClick={() => setIsShowMore(false)}
      >
        <div ref={containerRef}>
          <div className={styles.tabs__container} ref={currentRef}>
            <div className={styles.tabs__content}>
              {renderLeft?.(renderLeftRef)}
              {items.map((item, index, array) => {
                const isActive = activeKey === item.key;
                const isDragging =
                  draggedInfo.isVisible && draggedInfo.index === index;
                const isDropTarget =
                  dropTargetInfo.isVisible && dropTargetInfo.index === index;
                if (!visibleKey.includes(item.key)) {
                  return (
                    <TabItem
                      key={item.key}
                      ref={(ref) => {
                        (tabRefs.current[index] as any) = ref;
                      }}
                      onHandleChange={onHandleChange}
                      onHandleRemove={onHandleRemove}
                      item={tabItemClassName(item, true)}
                      isActive={isActive}
                      index={index}
                      onDragStart={(...props) =>
                        handleDragStart(...props, setDraggedInfo)
                      }
                      onDragOver={(...props) =>
                        handleDragOver(...props, setDropTargetInfo)
                      }
                      onDrop={handleDrop}
                      onDragEnd={() =>
                        onDragEnd(setDraggedInfo, setDropTargetInfo)
                      }
                      isVisible={false}
                      isDragging={isDragging}
                      isDropTarget={isDropTarget}
                      closeIconColor={iconColors?.close}
                      isCompact={isCompact}
                    />
                  );
                }
                return (
                  <>
                    <TabItem
                      ref={(ref) => {
                        (tabRefs.current[index] as any) = ref;
                      }}
                      onHandleChange={onHandleChange}
                      onHandleRemove={onHandleRemove}
                      item={tabItemClassName(item, false)}
                      isActive={isActive}
                      index={index}
                      onDragStart={(...props) =>
                        handleDragStart(...props, setDraggedInfo)
                      }
                      onDragOver={(...props) =>
                        handleDragOver(...props, setDropTargetInfo)
                      }
                      onDrop={handleDrop}
                      onDragEnd={() =>
                        onDragEnd(setDraggedInfo, setDropTargetInfo)
                      }
                      isVisible
                      isDragging={isDragging}
                      isDropTarget={isDropTarget}
                      closeIconColor={iconColors?.close}
                      isCompact={isCompact}
                    />

                    {((index !== array.length - 1 &&
                      index !== visibleKey?.length - 1) ||
                      invisibleKey.length > 0) && (
                      <Separator isActive={false} />
                    )}
                  </>
                );
              })}

              {!!invisible.length && (
                <Menu
                  width={200}
                  shadow="md"
                  opened={isShowMore}
                  onChange={setIsShowMore}
                >
                  <Menu.Target>
                    <div
                      className={classNames(
                        styles[
                          `tabs__tab--${
                            invisibleIsActive ? 'active' : 'inactive'
                          }`
                        ],
                        styles.tab__showmore,
                        className?.showMore?.base,
                        invisibleIsActive && className?.showMore?.active,
                        isCompact && styles.tab__showmore_compact,
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <DotsSvgIcon
                        ref={showMoreButtonRef}
                        fill={iconColors?.dots}
                      />
                    </div>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <ShowMore
                      init={init}
                      activeKey={activeKey!}
                      items={invisible}
                      onChange={onHandleChange}
                      onRemove={onHandleRemove}
                      offsetLeft={showMoreButtonRect.left}
                      onReorder={onReorder}
                      setDraggedInfo={setDraggedInfo}
                      setDropTargetInfo={setDropTargetInfo}
                      handleDrop={handleDrop}
                      draggedInfo={draggedInfo}
                      dropTargetInfo={dropTargetInfo}
                    />
                  </Menu.Dropdown>
                </Menu>
              )}
            </div>
            {renderRight?.(renderRightRef)}
          </div>
        </div>
        <NavigationTabSizeContext.Provider
          value={{
            width: tempWidth,
            height: tempHeight,
          }}
        >
          {items.map((item) => (
            <div
              key={`${item.key}-tabpanel-item`}
              className={
                classNames(
                  styles.tab__panel,
                  activeItem?.className?.panel,
                  className?.container,
                ) || ''
              }
              role="tabpanel"
              {...(activeKey !== item.key && { style: { display: 'none' } })}
            >
              <DefaultScrollArea>{item.getContent()}</DefaultScrollArea>
            </div>
          ))}
        </NavigationTabSizeContext.Provider>
      </div>
    </MantineProvider>
  );
}
