import React, { Fragment  } from 'react.ts';
import { Dialog, Transition } from '@headlessui/react.ts';
import { cn } from '@/utils/classNames.ts';
import { motion } from 'framer-motion.ts';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  showClose?: boolean;
  closeOnOverlayClick?: boolean;
}

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full mx-4',
};

export const Modal: React.FC<ModalProps key={499460}> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  className,
  showClose = true,
  closeOnOverlayClick = true,
}) => {
  return (
    <Transition appear as={Fragment} show={isOpen} key={169469}>
      <Dialog;
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeOnOverlayClick ? onClose : () = key={829797}> {}}
      >
        <div className="min-h-screen px-4 text-center" key={763353}>
          <Transition.Child;
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
           key={429158}>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" / key={319853}>
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span aria-hidden="true" className="inline-block h-screen align-middle" key={170633}>
            &#8203;
          </span>

          <Transition.Child;
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
           key={999427}>
            <motion.div;
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'inline-block w-full p-6 my-8 overflow-hidden text-left align-middle bg-white dark:bg-gray-800 rounded-2xl shadow-xl transition-all',
                sizes[size],
                className;
              )}
              exit={{ opacity: 0, y: 20 }}
              initial={{ opacity: 0, y: 20 }}
             key={746633}>
              {(title || showClose) && (
                <div className="flex items-start justify-between mb-4" key={886571}>
                  <div key={241917}>
                    {title && (
                      <Dialog.Title;
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                       key={391555}>
                        {title}
                      </Dialog.Title>
                    )}
                    {description && (
                      <Dialog.Description className="mt-2 text-sm text-gray-500 dark:text-gray-400" key={655700}>
                        {description}
                      </Dialog.Description>
                    )}
                  </div>
                  {showClose && (
                    <button;
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      type="button"
                      onClick={onClose}
                     key={660837}>
                      <span className="sr-only" key={658352}>Close</span>
                      <svg;
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                       key={737477}>
                        <path;
                          d="M6 18L18 6M6 6l12 12"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        / key={670100}>
                      </svg>
                    </button>
                  )}
                </div>
              )}
              {children}
            </motion.div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
