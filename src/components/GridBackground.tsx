import React, { ReactNode } from "react";

interface GridBackgroundProps {
  children: ReactNode;
}

export const GridBackground = ({ children }: GridBackgroundProps) => {
  return (
    <div className="h-full min-h-screen w-full dark:bg-neutral-950 bg-neutral-50 dark:bg-grid-primary/15 bg-grid-neutral-950/15 relative flex justify-center">
      <div className="absolute w-full pointer-events-none inset-0 flex items-center justify-center dark:bg-neutral-950 bg-neutral-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {children}
    </div>
  );
};
