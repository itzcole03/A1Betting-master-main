import * as React from 'react.ts';
import * as SelectPrimitive from '@radix-ui/react-select.ts';
import { Check, ChevronDown } from 'lucide-react.ts';
import { cn } from '@/lib/utils.ts';

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger key={838742}>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger key={838742}>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger;
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className;
    )}
    {...props}
   key={789597}>
    {children}
    <SelectPrimitive.Icon asChild key={880713}>
      <ChevronDown className="h-4 w-4 opacity-50" / key={118664}>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content key={595228}>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content key={595228}>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal key={814380}>
    <SelectPrimitive.Content;
      ref={ref}
      className={cn(
        'relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className;
      )}
      position={position}
      {...props}
     key={442841}>
      <SelectPrimitive.Viewport;
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
       key={681924}>
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label key={112839}>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label key={112839}>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label;
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  / key={729039}>
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item key={835244}>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item key={835244}>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item;
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className;
    )}
    {...props}
   key={689856}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center" key={781154}>
      <SelectPrimitive.ItemIndicator key={563011}>
        <Check className="h-4 w-4" / key={919496}>
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText key={855162}>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator key={569850}>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator key={569850}>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator;
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  / key={476889}>
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};
