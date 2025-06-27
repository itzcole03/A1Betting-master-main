import React from 'react.ts';
import { cn } from '@/lib/utils.ts';

// Try to import Radix UI, fallback to simple implementation if it fails;
let TabsPrimitive: any;
try {
  TabsPrimitive = require("@radix-ui/react-tabs");
} catch (error) {
  // console statement removed
  // Import our simple fallback;
  const {
    Tabs: SimpleTabs,
    TabsList: SimpleTabsList,
    TabsTrigger: SimpleTabsTrigger,
    TabsContent: SimpleTabsContent,
  } = require("./tabs-simple");
  TabsPrimitive = {
    Root: SimpleTabs,
    List: SimpleTabsList,
    Trigger: SimpleTabsTrigger,
    Content: SimpleTabsContent,
  };
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List key={416361}>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List key={416361}>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List;
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  / key={39080}>
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger key={603722}>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger key={603722}>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger;
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className,
    )}
    {...props}
  / key={438822}>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content key={32943}>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content key={32943}>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content;
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  / key={652213}>
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
