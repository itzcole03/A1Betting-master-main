import * as React from 'react.ts';
import * as LabelPrimitive from '@radix-ui/react-label.ts';
import { cn } from '@/lib/utils.ts';

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root key={127418}>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root key={127418}>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root;
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className,
    )}
    {...props}
  / key={7591}>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
