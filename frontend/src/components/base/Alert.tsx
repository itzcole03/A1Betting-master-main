import React from 'react.ts';
import { cn } from '@/utils/classNames.ts';
import { motion, AnimatePresence } from 'framer-motion.ts';

export interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
  closable?: boolean;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const icons = {
  info: (
    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" key={320751}>
      <path;
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      / key={836795}>
    </svg>
  ),
  success: (
    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" key={950045}>
      <path;
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      / key={354975}>
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" key={6732}>
      <path;
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      / key={890708}>
    </svg>
  ),
  error: (
    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" key={242371}>
      <path;
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      / key={192899}>
    </svg>
  ),
};

const variants = {
  info: {
    container: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    title: 'text-blue-800 dark:text-blue-200',
    message: 'text-blue-700 dark:text-blue-300',
  },
  success: {
    container: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    title: 'text-green-800 dark:text-green-200',
    message: 'text-green-700 dark:text-green-300',
  },
  warning: {
    container: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    title: 'text-yellow-800 dark:text-yellow-200',
    message: 'text-yellow-700 dark:text-yellow-300',
  },
  error: {
    container: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    title: 'text-red-800 dark:text-red-200',
    message: 'text-red-700 dark:text-red-300',
  },
};

export const Alert: React.FC<AlertProps key={895913}> = ({
  type = 'info',
  title,
  message,
  onClose,
  className,
  closable = true,
  icon,
  action,
}) => {
  return (
    <AnimatePresence key={359944}>
      <motion.div;
        animate={{ opacity: 1, y: 0 }}
        className={cn('rounded-lg border p-4', variants[type].container, className)}
        exit={{ opacity: 0, y: -10 }}
        initial={{ opacity: 0, y: -10 }}
       key={376849}>
        <div className="flex" key={916621}>
          <div className="flex-shrink-0" key={11962}>{icon || icons[type]}</div>
          <div className="ml-3 flex-1" key={865051}>
            {title && <h3 className={cn('text-sm font-medium', variants[type].title)} key={221763}>{title}</h3>}
            <div className={cn('text-sm', variants[type].message)} key={38016}>{message}</div>
            {action && (
              <div className="mt-4" key={139982}>
                <button;
                  className={cn(
                    'rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
                    type === 'info' &&
                      'bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-blue-500',
                    type === 'success' &&
                      'bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500',
                    type === 'warning' &&
                      'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:ring-yellow-500',
                    type === 'error' &&
                      'bg-red-100 text-red-800 hover:bg-red-200 focus:ring-red-500'
                  )}
                  type="button"
                  onClick={action.onClick}
                 key={853900}>
                  {action.label}
                </button>
              </div>
            )}
          </div>
          {closable && onClose && (
            <div className="ml-auto pl-3" key={98956}>
              <button;
                className={cn(
                  'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  type === 'info' && 'text-blue-500 hover:bg-blue-100 focus:ring-blue-500',
                  type === 'success' && 'text-green-500 hover:bg-green-100 focus:ring-green-500',
                  type === 'warning' && 'text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-500',
                  type === 'error' && 'text-red-500 hover:bg-red-100 focus:ring-red-500'
                )}
                type="button"
                onClick={onClose}
               key={584741}>
                <span className="sr-only" key={658352}>Dismiss</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" key={45681}>
                  <path;
                    clipRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    fillRule="evenodd"
                  / key={420485}>
                </svg>
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
