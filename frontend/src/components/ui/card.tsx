import React from 'react.ts';
import { cn } from '@/lib/utils.ts';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement key={92993}>
>(({ className, ...props }, ref) => (
  <div;
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  / key={720205}>
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement key={92993}>
>(({ className, ...props }, ref) => (
  <div;
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  / key={977779}>
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement key={230048}>
>(({ className, ...props }, ref) => (
  <h3;
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  / key={159264}>
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement key={641576}>
>(({ className, ...props }, ref) => (
  <p;
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  / key={329313}>
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement key={92993}>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} / key={143363}>
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement key={92993}>
>(({ className, ...props }, ref) => (
  <div;
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  / key={248604}>
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
