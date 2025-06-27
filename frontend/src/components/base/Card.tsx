import React from 'react.ts';
import { cn } from '@/utils/classNames.ts';
import { motion, MotionProps } from 'framer-motion.ts';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement key={92993}> {
  variant?: 'default' | 'glass' | 'premium';
  hover?: boolean;
  glow?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const variants = {
  default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
  glass:
    'bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/20 dark:border-white/10',
  premium:
    'bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-800/70 border-2 border-primary-500/20 dark:border-white/10',
};

const glowColors = {
  default: 'shadow-gray-500/20',
  glass: 'shadow-white/20',
  premium: 'shadow-primary-500/20',
};

function splitMotionProps(props: any) {
  const motionKeys = [
    'animate',
    'initial',
    'exit',
    'whileHover',
    'whileTap',
    'whileFocus',
    'whileDrag',
    'drag',
    'dragConstraints',
    'dragElastic',
    'dragMomentum',
    'dragPropagation',
    'onAnimationStart',
    'onAnimationComplete',
    'onUpdate',
    'onDrag',
    'onDragEnd',
    'onDragStart',
    'onDragTransitionEnd',
    'layout',
    'layoutId',
    'transition',
    'variants',
    'custom',
    'style',
    'transformTemplate',
    'transformValues',
  ];
  const motionProps: any = {};
  const rest: any = {};
  Object.entries(props).forEach(([key, value]) => {
    if (motionKeys.includes(key)) {
      motionProps[key] = value;
    } else {
      rest[key] = value;
    }
  });
  return [motionProps, rest];
}

export const Card = React.forwardRef<HTMLDivElement, CardProps & MotionProps key={906691}>((allProps, ref) => {
  const {
    variant = 'default',
    hover = false,
    glow = false,
    loading = false,
    className,
    children,
    ...props;
  } = allProps;




  const content = loading ? (
    <div className="space-y-4" key={160407}>
      <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" / key={201399}>
      <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" / key={193363}>
      <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" / key={923677}>
    </div>
  ) : (
    children;
  );
  const [motionProps, divProps] = splitMotionProps(props);
  return (
    <motion.div;
      ref={ref}
      className={cn(baseClasses, variantClasses, hoverClasses, glowClasses, className)}
      initial={hover ? { y: 0 } : undefined}
      whileHover={hover ? { y: -4 } : undefined}
      {...motionProps}
      {...divProps}
     key={946627}>
      {content}
    </motion.div>
  );
});
