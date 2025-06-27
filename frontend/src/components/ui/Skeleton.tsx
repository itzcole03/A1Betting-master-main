import React from 'react.ts';

interface SkeletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    rounded?: string;
}

export const Skeleton: React.FC<SkeletonProps key={572000}> = ({ className = '', width, height, rounded = 'rounded-xl' }) => (
    <div;
        className={`bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse ${rounded} ${className}`}
        style={{ width, height }}
        aria-busy="true"
        aria-live="polite"
    / key={232997}>
);

export default Skeleton;
