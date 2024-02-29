"use client";

import Image from "next/image";
import { SwitchTheme } from "..";

export const LoginHeader = () => {
  return (
    <div className="flex flex-row justify-between items-center">
      <Image width={90} height={82.44} src="/logo-dark.svg" alt="logo" />
      <SwitchTheme />
    </div>
  );
};
