import React, { ReactNode  } from 'react.ts';
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}
declare const Modal: React.FC<ModalProps>;
export { Modal };
