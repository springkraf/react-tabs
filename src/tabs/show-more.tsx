import { ScrollArea } from '@mantine/core';
import classNames from 'classnames';

import styles from './styles.module.css';
import TabItem from './tab-item';
import type { ShowMoreProps } from './types';
import { handleDragOver, handleDragStart, onDragEnd } from './utils';

export default function ShowMore(props: ShowMoreProps) {
  const {
    activeKey,
    items,
    onRemove,
    onChange,
    offsetLeft,
    init,
    setDraggedInfo,
    setDropTargetInfo,
    handleDrop,
    draggedInfo,
    dropTargetInfo,
    className,
  } = props;

  return (
    <div
      className={className?.container}
      style={{
        left: offsetLeft,
      }}
    >
      <ScrollArea>
        <div className={styles.tab__showmore_content}>
          {items.map((item, index) => {
            const isActive = activeKey === item.key;
            const isDragging =
              !draggedInfo.isVisible && draggedInfo.index === index;
            const isDropTarget =
              !dropTargetInfo.isVisible && dropTargetInfo.index === index;

            return (
              <TabItem
                key={item.key}
                onHandleChange={(key) => {
                  init();
                  onChange?.(key);
                }}
                isActive={isActive}
                item={{
                  ...item,
                  className: {
                    ...item.className,
                    tabActive: classNames(
                      className?.tabItem?.active,
                      item.className?.tabActive,
                    ),
                    tab: classNames(
                      styles.tab__showmore_item,
                      className?.tabItem?.base,
                      item.className?.tab,
                    ),
                    pulseBar: classNames(
                      className?.tabItem?.pulseBar,
                      item.className?.pulseBar,
                    ),
                  },
                }}
                onHandleRemove={onRemove}
                index={index}
                onDragStart={(...props) =>
                  handleDragStart(...props, setDraggedInfo)
                }
                onDragOver={(...props) =>
                  handleDragOver(...props, setDropTargetInfo)
                }
                onDrop={handleDrop}
                onDragEnd={() => onDragEnd(setDraggedInfo, setDropTargetInfo)}
                isVisible={false}
                isDragging={isDragging}
                isDropTarget={isDropTarget}
              />
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
