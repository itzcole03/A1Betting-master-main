import { StateCreator } from 'zustand.ts';
import { Toast } from '@/types.ts';
export interface ToastSlice {
    toasts: Toast[];
    addToast: (type: Toast['type'], message: string) => void;
    removeToast: (id: string) => void;
}
export declare const createToastSlice: StateCreator<ToastSlice>;
