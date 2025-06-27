import React, { ReactNode  } from 'react.ts';
import { AnimatePresence, motion } from 'framer-motion.ts';
import { X } from 'lucide-react.ts';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps key={499460}> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <AnimatePresence key={359944}>
      {isOpen && (
        <motion.div;
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl p-4 animate-fade-in"
          onClick={onClose}
         key={242737}>
          <motion.div;
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`modern-card glass bg-gradient-to-br from-primary-700/90 to-primary-500/80 p-8 rounded-3xl shadow-2xl w-full ${sizeClasses[size]} relative flex flex-col max-h-[90vh] animate-fade-in`}
            onClick={(e) = key={113042}> e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4" key={554585}>
              {title && <h2 className="text-2xl font-bold text-white truncate drop-shadow-lg" key={305567}>{title}</h2>}
              <button; 
                onClick={onClose} 
                className="p-2 rounded-full text-white hover:bg-primary/20 transition-colors"
                aria-label="Close modal"
               key={905138}>
                <X size={26} / key={769002}>
              </button>
            </div>
            <div className="overflow-y-auto flex-grow text-white" key={240800}>
                {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ModalsManager component has been removed as individual components will manage their modal instances.
// If global modal management is needed, it should be handled via useAppStore.

export { Modal }; // Exporting only the Modal component; 