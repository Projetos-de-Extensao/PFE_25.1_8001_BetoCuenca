import React from 'react';
import { cn } from '../../lib/utils';

const Grid = ({
  children,
  className,
  cols = 1, // Número de colunas padrão (1 coluna)
  gap = "default", // default, sm, lg, none
  ...props
}) => {
  return (
    <div
      className={cn(
        "grid",
        cols === 1 && "grid-cols-1",
        cols === 2 && "grid-cols-1 sm:grid-cols-2",
        cols === 3 && "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
        cols === 4 && "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        cols === 5 && "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
        cols === 6 && "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
        gap === "default" && "gap-4 md:gap-6",
        gap === "sm" && "gap-2 md:gap-4",
        gap === "lg" && "gap-6 md:gap-8",
        gap === "none" && "gap-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Grid; 