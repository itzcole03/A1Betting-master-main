import React from 'react.ts';
import { ShapValue } from '@/types/explainability.ts';
interface ShapBreakdownModalProps {
    isOpen: boolean;
    onClose: () => void;
    feature: ShapValue;
}
export declare const ShapBreakdownModal: React.FC<ShapBreakdownModalProps>;
export {};
