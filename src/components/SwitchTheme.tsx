"use client";

import React, { useEffect, useState } from "react";
import { Switch } from "./ui/switch";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Skeleton } from "./ui/skeleton";

export const SwitchTheme = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  if (!mounted)
    return (
      <div className="flex flex-row space-x-2 items-center">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="w-14 h-6 rounded-lg" />
      </div>
    );

  return (
    <div className="flex flex-row space-x-2 items-center">
      {resolvedTheme === "dark" ? (
        <MoonIcon className="text-neutral-50 w-[22px] h-[22px]" />
      ) : (
        <SunIcon className="text-neutral-950 w-[22px] h-[22px]" />
      )}
      <Switch
        onCheckedChange={handleCheckChange}
        checked={resolvedTheme === "dark"}
      />
    </div>
  );
};
