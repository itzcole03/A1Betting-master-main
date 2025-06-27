import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';




SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectContent = React.forwardRef(({ className, children, position = 'popper', ...props }, ref) => (_jsx(SelectPrimitive.Portal, { children: _jsx(SelectPrimitive.Content, { ref: ref, className: cn('relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1', className), position: position, ...props, children: _jsx(SelectPrimitive.Viewport, { className: cn('p-1', position === 'popper' &&
                'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'), children: children }) }) })));
SelectContent.displayName = SelectPrimitive.Content.displayName;

SelectLabel.displayName = SelectPrimitive.Label.displayName;

SelectItem.displayName = SelectPrimitive.Item.displayName;

SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, };
