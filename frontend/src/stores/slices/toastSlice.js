import { v4 as uuidv4 } from 'uuid';
export const createToastSlice = set => ({
    toasts: [],
    addToast: (type, message) => {

        set(state => ({
            toasts: [...state.toasts, { id, type, message }],
        }));
    },
    removeToast: id => {
        set(state => ({
            toasts: state.toasts.filter(toast => toast.id !== id),
        }));
    },
});
