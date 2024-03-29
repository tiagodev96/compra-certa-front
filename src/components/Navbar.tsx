"use client";
import { useState } from "react";
import { HoveredLink, Menu } from "./ui/aceternity/navbar-menu";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { SwitchTheme } from ".";
import { AvatarIcon } from "@radix-ui/react-icons";

export const Navbar = ({ className }: { className?: string }) => {
  const [active, setActive] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className={cn("fixed top-10 inset-x-0 w-fit mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <div className="flex items-center gap-x-6">
          <HoveredLink href="/">
            <Image width={50} height={50} src="/icon-logo.svg" alt="logo" />
          </HoveredLink>

          <HoveredLink href="/">
            <span className="text-sm font-medium hover:text-primary transition-all text-neutral-950 dark:text-neutral-50">
              Início
            </span>
          </HoveredLink>

          <HoveredLink href="/history">
            <span className="text-sm font-medium hover:text-primary transition-all text-neutral-950 dark:text-neutral-50">
              Histórico
            </span>
          </HoveredLink>

          {isLoggedIn ? ( 
            <>
              <AvatarIcon /> 
              <button onClick={handleLogout} className="text-sm font-medium relative text-neutral-950 dark:text-neutral-50 px-4 hover:bg-primary hover:text-neutral-950 transition py-2 rounded-full">
                Logout
                <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-primary  to-transparent h-px" />
              </button>
            </>
          ) : ( 
            <HoveredLink href="/login">
              <div className="border text-sm font-medium relative border-neutral-300 dark:border-neutral-600 dark:border-white/[0.2] text-neutral-950 dark:text-neutral-50 px-4 hover:bg-primary hover:text-neutral-950 transition py-2 rounded-full">
                <span>Login</span>
                <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-primary  to-transparent h-px" />
              </div>
            </HoveredLink>
          )}

          <SwitchTheme />
        </div>
      </Menu>
    </div>
  );
};
