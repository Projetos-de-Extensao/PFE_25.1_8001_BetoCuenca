import React from 'react';
import { cn } from '../../lib/utils'; // Assumindo que temos esta função de utilitário

const Container = ({
  children,
  className,
  size = "default", // default, sm, lg, xl, full
  padding = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        padding && "px-4 sm:px-6 md:px-8",
        size === "default" && "max-w-screen-xl",
        size === "sm" && "max-w-screen-md",
        size === "lg" && "max-w-screen-xl",
        size === "xl" && "max-w-screen-2xl",
        size === "full" && "max-w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container; 