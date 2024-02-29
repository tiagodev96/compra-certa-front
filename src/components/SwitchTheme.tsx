"use client";

import React from "react";
import { Switch } from "./ui/switch";
import { useThemeStore } from "@/store/ThemeStore";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

export const SwitchTheme = () => {
  const [isDark, toggleTheme] = useThemeStore((state) => [
    state.isDark,
    state.toggle,
  ]);

  return (
    <div className="flex flex-row space-x-2 items-center">
      {isDark ? (
        <MoonIcon className="text-neutral-50 w-[22px] h-[22px]" />
      ) : (
        <SunIcon className="text-neutral-950 w-[22px] h-[22px]" />
      )}
      <Switch onCheckedChange={toggleTheme} checked={isDark} />
    </div>
  );
};
