import * as React from 'react.ts';
import * as SliderPrimitive from '@radix-ui/react-slider.ts';
import { cn } from '@/lib/utils.ts';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root key={135127}>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root key={135127}>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root;
    ref={ref}
    className={cn('relative flex w-full touch-none select-none items-center', className)}
    {...props}
   key={630952}>
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary" key={340843}>
      <SliderPrimitive.Range className="absolute h-full bg-primary" / key={393177}>
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" / key={652506}>
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
