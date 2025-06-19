import { DragEvent, MouseEventHandler, MutableRefObject, ReactNode } from '../../node_modules/react';
export interface NavigationTabItem {
    key: string;
    title: {
        content: string | ReactNode;
        onContextMenu?: MouseEventHandler<HTMLDivElement>;
    };
    getContent: () => ReactNode;
    className?: {
        title?: string;
        tab?: string;
        tabActive?: string;
        tabInactive?: string;
        panel?: string;
        icon?: string;
    };
}
export interface TabItemProps {
    onHandleChange: (key: string) => void;
    onHandleRemove: (key: string) => void;
    isActive: boolean;
    item: NavigationTabItem;
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
    items: NavigationTabItem[];
    onRemove: (key: string) => void;
    onChange: (key: string) => void;
    activeKey?: string;
    containerClass?: string;
    renderLeft?: (ref: MutableRefObject<HTMLDivElement | null>) => ReactNode;
    renderRight?: (ref: MutableRefObject<HTMLDivElement | null>) => ReactNode;
    onResizing?: (params: {
        isChanged: boolean;
        width: number;
    }) => void;
    onReorder?: (items: NavigationTabItem[]) => void;
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
export interface NavigationTabItemProps {
    key: string;
    title: {
        content: string | ReactNode;
        onContextMenu?: MouseEventHandler<HTMLDivElement>;
    };
    getContent: () => ReactNode;
    className?: {
        title?: string;
        tab?: string;
        panel?: string;
        icon?: string;
    };
}
export interface ShowMoreProps {
    items: NavigationTabItem[];
    activeKey: string;
    onChange: (key: string) => void;
    onRemove: (key: string) => void;
    init: () => void;
    offsetLeft: number;
    onReorder?: (items: NavigationTabItem[]) => void;
    setDraggedInfo: React.Dispatch<React.SetStateAction<DragInfo>>;
    setDropTargetInfo: React.Dispatch<React.SetStateAction<DragInfo>>;
    handleDrop: (e: React.DragEvent, dropIndex: number, isDropVisible: boolean) => void;
    draggedInfo: DragInfo;
    dropTargetInfo: DragInfo;
}
