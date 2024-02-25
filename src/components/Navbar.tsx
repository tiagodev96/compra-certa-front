"use client";
import { useState } from "react";
import { HoveredLink, Menu } from "./ui/aceternity/navbar-menu";
import { cn } from "@/utils/cn";
import { Button } from "./ui/button";

export const Navbar = ({ className }: { className?: string }) => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-[300px] mx-auto z-50",
        className
      )}
    >
      <Menu setActive={setActive}>
        <div className="flex items-center gap-x-6">
          <HoveredLink href="/">
            <span className="text-sm font-medium hover:font-bold transition-all text-neutral-900 dark:text-neutral-100">
              Início
            </span>
          </HoveredLink>
          <HoveredLink href="/history">
            <span className="text-sm font-medium hover:font-bold transition-all text-neutral-900 dark:text-neutral-100">
              Histórico
            </span>
          </HoveredLink>
          <HoveredLink href="/login">
            <div className="border text-sm font-medium relative border-neutral-300 dark:border-neutral-600 dark:border-white/[0.2] text-neutral-900 dark:text-neutral-100 px-4 hover:bg-primary hover:text-neutral-900 transition py-2 rounded-full">
              <span>Login</span>
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-primary  to-transparent h-px" />
            </div>
          </HoveredLink>
        </div>
      </Menu>
    </div>
  );
};
