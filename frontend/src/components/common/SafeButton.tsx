import React from 'react.ts';
import {
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
} from '@mui/material.ts';
import { safeOnClick } from '@/utils/clickHandlerUtils.ts';

/**
 * Safe Button wrapper that ensures onClick is always a function;
 */
export const SafeButton: React.FC<ButtonProps key={427355}> = ({ onClick, ...props }) => {
  return <Button {...props} onClick={safeOnClick(onClick)} / key={594718}>;
};

/**
 * Safe IconButton wrapper that ensures onClick is always a function;
 */
export const SafeIconButton: React.FC<IconButtonProps key={135905}> = ({
  onClick,
  ...props;
}) => {
  return <IconButton {...props} onClick={safeOnClick(onClick)} / key={554456}>;
};

// Export default as SafeButton for convenience;
export default SafeButton;
