import { StateCreator } from 'zustand.ts';
import { ToastNotification } from '@/../../shared/formatters.ts';
import { AppStore } from '@/stores/useAppStore.ts';
export interface NotificationSlice {
    toasts: ToastNotification[];
    addToast: (toast: Omit<ToastNotification, 'id'>) => string;
    removeToast: (id: string) => void;
}
export declare const initialNotificationState: Pick<NotificationSlice, 'toasts'>;
export declare const createNotificationSlice: StateCreator<AppStore, [], [], NotificationSlice>;
