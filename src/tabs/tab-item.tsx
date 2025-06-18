import { forwardRef } from 'react';
import type { TabItemProps } from './types';
import classNames from 'classnames';
import styles from './styles.module.css';
import CloseSvgIcon from '../assets/close.svg';

const TabItem = forwardRef<HTMLDivElement, TabItemProps>(
  function TabItem(props, ref) {
    const {
      item,
      onHandleChange,
      isActive,
      onHandleRemove,
      index,
      onDragStart,
      onDragOver,
      onDrop,
      isVisible,
      isDragging,
      isDropTarget,
      onDragEnd,
      closeIconColor,
      isCompact,
    } = props;

    return (
      <div
        key={item.key}
        onClick={() => onHandleChange(item.key)}
        ref={ref}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onHandleChange(item.key);
          }
        }}
        tabIndex={0}
        aria-selected={isActive}
        role="tab"
        className={classNames(
          styles[`tabs__tab--${isActive ? 'active' : 'inactive'}`],
          styles.tabs__tab,
          isCompact && styles.tabs__tab_compact,
          item.className?.tab,

          isDragging && styles['tabs__tab--dragging'],
          isDropTarget && styles['tabs__tab--drop-target'],
        )}
        onContextMenu={item.title.onContextMenu}
        draggable
        onDragStart={(e) => onDragStart(e, index, isVisible)}
        onDragOver={(e) => onDragOver(e, index, isVisible)}
        onDrop={(e) => onDrop(e, index, isVisible)}
        onDragEnd={onDragEnd}
      >
        <span
          className={classNames(
            styles.tab_item_title,
            item.className?.panel,
            item.className?.title,
          )}
        >
          {item.title.content}
        </span>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onHandleRemove(item.key);
          }}
          className={classNames(styles.tabs__button, item.className?.icon)}
        >
          <CloseSvgIcon fill={closeIconColor} />
        </div>
      </div>
    );
  },
);

TabItem.displayName = 'TabItem';

export default TabItem;
