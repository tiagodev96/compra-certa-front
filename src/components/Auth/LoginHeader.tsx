"use client";

import Image from "next/image";
import { SwitchTheme } from "..";

export const LoginHeader = () => {
  return (
    <div className="flex flex-row justify-between items-center">
      <Image width={100} height={91.6} src="/logo-dark.svg" alt="logo" />
      <SwitchTheme />
    </div>
  );
};
