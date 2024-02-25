"use client";
import { useState } from "react";
import { HoveredLink, Menu } from "./ui/aceternity/navbar-menu";
import { cn } from "@/utils/cn";

export const Navbar = ({ className }: { className?: string }) => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-[450px] mx-auto z-50",
        className
      )}
    >
      <Menu setActive={setActive}>
        <HoveredLink className="text-sm font-medium" href="/">
          Início
        </HoveredLink>
        <HoveredLink className="text-sm font-medium" href="/history">
          Histórico
        </HoveredLink>
      </Menu>
    </div>
  );
};
