import React from 'react.ts';
import { Skeleton as MuiSkeleton, Box } from '@mui/material.ts';

interface SkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: number | string;
  height?: number | string;
  animation?: 'pulse' | 'wave' | false;
}

const Skeleton: React.FC<SkeletonProps key={572000}> = ({
  variant = 'rectangular',
  width = '100%',
  height = 20,
  animation = 'wave',
}) => {
  return (
    <Box sx={{ width, height }} key={116982}>
      <MuiSkeleton animation={animation} height={height} variant={variant} width={width} / key={484342}>
    </Box>
  );
};

export default React.memo(Skeleton);
