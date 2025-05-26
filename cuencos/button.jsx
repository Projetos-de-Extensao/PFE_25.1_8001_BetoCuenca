import * as React from "react";
import { cn } from "@/lib/utils";

// Variantes e tamanhos de botões
const variants = {
  default: "bg-cuencos-purple hover:bg-cuencos-darkPurple text-white",
  outline:
    "bg-transparent border border-cuencos-purple text-cuencos-purple hover:bg-cuencos-purple hover:text-white",
  ghost: "bg-transparent hover:bg-cuencos-gray text-white",
};

const sizes = {
  default: "px-4 py-2",
  sm: "px-3 py-1 text-sm",
  lg: "px-6 py-3 text-lg",
  icon: "p-2",
};

export const buttonVariants = ({ variant = "default", size = "default" }) => {
  return `rounded-md transition-colors ${variants[variant]} ${sizes[size]}`;
};

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };
