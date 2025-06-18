import React from 'react';

export interface NavigationTabItem {
  key: string;
  title: {
    content: string | React.ReactNode;
    onContextMenu?: React.MouseEventHandler<HTMLDivElement>;
  };
  getContent: () => React.ReactNode;
  className?: {
    title?: string;
    tab?: string;
    panel?: string;
    icon?: string;
  };
}

interface NavigationTabSizeContextType {
  width: number;
  height: number;
}

export const NavigationTabSizeContext =
  React.createContext<NavigationTabSizeContextType>(undefined as any);
