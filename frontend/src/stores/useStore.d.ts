import { ToastSlice } from './slices/toastSlice.ts';
interface StoreState extends ToastSlice {
}
export declare const useStore: import("zustand").UseBoundStore<import("zustand").StoreApi<StoreState>>;
export {};
