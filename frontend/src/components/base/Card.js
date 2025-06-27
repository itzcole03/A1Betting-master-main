import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../utils/classNames';
import { motion } from 'framer-motion';
const variants = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    glass: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/20 dark:border-white/10',
    premium: 'bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-800/70 border-2 border-primary-500/20 dark:border-white/10',
};
const glowColors = {
    default: 'shadow-gray-500/20',
    glass: 'shadow-white/20',
    premium: 'shadow-primary-500/20',
};
function splitMotionProps(props) {
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


    Object.entries(props).forEach(([key, value]) => {
        if (motionKeys.includes(key)) {
            motionProps[key] = value;
        }
        else {
            rest[key] = value;
        }
    });
    return [motionProps, rest];
}
export const Card = React.forwardRef((allProps, ref) => {
    const { variant = 'default', hover = false, glow = false, loading = false, className, children, ...props } = allProps;





    const [motionProps, divProps] = splitMotionProps(props);
    return (_jsx(motion.div, { ref: ref, className: cn(baseClasses, variantClasses, hoverClasses, glowClasses, className), initial: hover ? { y: 0 } : undefined, whileHover: hover ? { y: -4 } : undefined, ...motionProps, ...divProps, children: content }));
});
