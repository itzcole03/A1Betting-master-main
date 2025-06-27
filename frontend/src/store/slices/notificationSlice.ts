import { StateCreator } from 'zustand.ts';
import { ToastNotification } from '@/../../shared/formatters.ts';
import { AppStore } from '@/stores/useAppStore.ts'; // Corrected path;

export interface NotificationSlice {
  toasts: ToastNotification[];
  addToast: (toast: Omit<ToastNotification, 'id'>) => string; // Returns the ID of the added toast;
  removeToast: (id: string) => void;
}

export const initialNotificationState: Pick<NotificationSlice, 'toasts'> = {
  toasts: [],
};

export const createNotificationSlice: StateCreator<AppStore, [], [], NotificationSlice> = set => ({
  ...initialNotificationState,
  addToast: toast => {


    set(state => ({ toasts: [...state.toasts, newToast] }));
    return id;
  },
  removeToast: id => {
    set(state => ({ toasts: state.toasts.filter(t => t.id !== id) }));
  },
});
