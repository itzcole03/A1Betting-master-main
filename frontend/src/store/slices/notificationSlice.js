export const initialNotificationState = {
    toasts: [],
};
export const createNotificationSlice = set => ({
    ...initialNotificationState,
    addToast: toast => {


        set(state => ({ toasts: [...state.toasts, newToast] }));
        return id;
    },
    removeToast: id => {
        set(state => ({ toasts: state.toasts.filter(t => t.id !== id) }));
    },
});
