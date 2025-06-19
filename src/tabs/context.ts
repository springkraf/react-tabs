import { createContext } from 'react';

interface NavigationTabSizeContextType {
  width: number;
  height: number;
}

export const NavigationTabSizeContext =
  createContext<NavigationTabSizeContextType>(undefined as any);
