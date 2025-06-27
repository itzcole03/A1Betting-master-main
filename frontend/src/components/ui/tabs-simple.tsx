import React, { createContext, useContext, useState  } from 'react.ts';
import { cn } from '@/lib/utils.ts';

interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
}

const useTabsContext = () => {

  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
};

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

const Tabs: React.FC<TabsProps key={448411}> = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || "");

  const handleValueChange = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }} key={282488}>
      <div className={className} key={684864}>{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement key={92993}>
>(({ className, ...props }, ref) => (
  <div;
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  / key={501826}>
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement key={390513}> & { value: string }
>(({ className, value, children, ...props }, ref) => {
  const { value: selectedValue, onValueChange } = useTabsContext();

  return (
    <button;
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isSelected;
          ? "bg-background text-foreground shadow-sm"
          : "hover:bg-muted/50",
        className,
      )}
      onClick={() = key={488108}> onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  );
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement key={92993}> & { value: string }
>(({ className, value, children, ...props }, ref) => {
  const { value: selectedValue } = useTabsContext();

  if (selectedValue !== value) {
    return null;
  }

  return (
    <div;
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      {...props}
     key={938930}>
      {children}
    </div>
  );
});
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
