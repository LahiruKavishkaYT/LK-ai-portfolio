import React from "react";
import { motion } from "framer-motion";

// Utility for class merging
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

interface TilesProps {
  className?: string;
  rows?: number; // Number of columns (horizontal items)
  cols?: number; // Number of rows (vertical items)
  tileClassName?: string;
}

export const Tiles: React.FC<TilesProps> = ({
  className,
  rows = 100,
  cols = 20,
  tileClassName,
}) => {
  const rowsArray = new Array(rows).fill(1);
  const colsArray = new Array(cols).fill(1);

  return (
    <div
      className={cn(
        "relative z-0 flex w-full h-full justify-center overflow-hidden",
        className
      )}
    >
      {rowsArray.map((_, i) => (
        <div
          key={`col-strip-${i}`}
          className={cn(
            "w-12 md:w-16 h-full border-l border-white/5 relative flex flex-col shrink-0"
          )}
        >
          {colsArray.map((_, j) => (
            <motion.div
              key={`tile-${i}-${j}`}
              initial={{ backgroundColor: "transparent" }}
              whileHover={{
                backgroundColor: "rgba(255, 87, 34, 0.15)", // Brand orange low opacity
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2, ease: "linear" },
                backgroundColor: "transparent",
              }}
              className={cn(
                "w-full h-12 md:h-16 border-t border-white/5 relative shrink-0",
                tileClassName
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
};