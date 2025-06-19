import { Dispatch, DragEvent, SetStateAction } from '../../node_modules/react';
import { DragInfo } from './types';
export declare const handleDragOver: (e: DragEvent, index: number, isVisible: boolean, setDropTargetInfo: Dispatch<SetStateAction<DragInfo>>) => void;
export declare const handleDragStart: (e: DragEvent, index: number, isVisible: boolean, setDraggedInfo: Dispatch<SetStateAction<DragInfo>>) => void;
export declare const onDragEnd: (setDraggedInfo: Dispatch<SetStateAction<DragInfo>>, setDropTargetInfo: Dispatch<SetStateAction<DragInfo>>) => void;
