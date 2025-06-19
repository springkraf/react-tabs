import type { Dispatch, DragEvent, SetStateAction } from 'react';

import type { DragInfo } from './types';

export const handleDragOver = (
  e: DragEvent,
  index: number,
  isVisible: boolean,
  setDropTargetInfo: Dispatch<SetStateAction<DragInfo>>,
) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  setDropTargetInfo({ index, isVisible });
};

export const handleDragStart = (
  e: DragEvent,
  index: number,
  isVisible: boolean,
  setDraggedInfo: Dispatch<SetStateAction<DragInfo>>,
) => {
  setDraggedInfo({ index, isVisible });
  e.dataTransfer.effectAllowed = 'move';
};

export const onDragEnd = (
  setDraggedInfo: Dispatch<SetStateAction<DragInfo>>,
  setDropTargetInfo: Dispatch<SetStateAction<DragInfo>>,
) => {
  setDraggedInfo({ index: null, isVisible: true });
  setDropTargetInfo({ index: null, isVisible: true });
};
