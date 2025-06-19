import type {
  DragEvent,
  MouseEventHandler,
  MutableRefObject,
  ReactNode,
} from 'react';

export interface NavigationTabItemProps {
  key: string;
  title: {
    content: string | ReactNode;
    onContextMenu?: MouseEventHandler<HTMLDivElement>;
  };
  getContent: () => ReactNode;
  className?: {
    icon?: string;
    panel?: string;
    pulseBar?: string;
    tab?: string;
    tabActive?: string;
    title?: string;
  };
}

export interface TabItemProps {
  onHandleChange: (key: string) => void;
  onHandleRemove: (key: string) => void;
  isActive: boolean;
  item: NavigationTabItemProps;
  index: number;
  onDragStart: (e: DragEvent, index: number, isVisible: boolean) => void;
  onDragOver: (e: DragEvent, index: number, isVisible: boolean) => void;
  onDrop: (e: DragEvent, dropIndex: number, isDropVisible: boolean) => void;
  onDragEnd: () => void;
  isVisible: boolean;
  isDragging: boolean;
  isDropTarget: boolean;
  closeIconColor?: string;
  isCompact?: boolean;
}

export interface TabProps {
  items: NavigationTabItemProps[];
  onRemove: (key: string) => void;
  onChange: (key: string) => void;
  activeKey?: string;
  className?: {
    container?: string;
    showMore?: {
      active?: string;
      base?: string;
      container?: string;
    };
    tabItem?: {
      active?: string;
      base?: string;
      pulseBar?: string;
    };
  };
  renderLeft?: (ref: MutableRefObject<HTMLDivElement | null>) => ReactNode;
  renderRight?: (ref: MutableRefObject<HTMLDivElement | null>) => ReactNode;
  onResizing?: (params: { isChanged: boolean; width: number }) => void;
  onReorder?: (items: NavigationTabItemProps[]) => void;
  iconColors?: {
    close?: string;
    dots?: string;
  };
  variant?: 'compact' | 'normal';
}

export interface DragInfo {
  index: number | null;
  isVisible: boolean;
}

export interface TabStateProps {
  tabDimension: number[];
  totalTabsWidth: number;
}

export interface ShowMoreProps {
  items: NavigationTabItemProps[];
  activeKey: string;
  onChange: (key: string) => void;
  onRemove: (key: string) => void;
  init: () => void;
  offsetLeft: number;
  onReorder?: (items: NavigationTabItemProps[]) => void;
  setDraggedInfo: React.Dispatch<React.SetStateAction<DragInfo>>;
  setDropTargetInfo: React.Dispatch<React.SetStateAction<DragInfo>>;
  handleDrop: (
    e: React.DragEvent,
    dropIndex: number,
    isDropVisible: boolean,
  ) => void;
  draggedInfo: DragInfo;
  dropTargetInfo: DragInfo;
  className?: {
    container?: string;
    tabItem?: {
      base?: string;
      active?: string;
      pulseBar?: string;
    };
  };
}
