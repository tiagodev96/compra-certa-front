"use client";

import Image from "next/image";
import { SwitchTheme } from "..";
import { useTheme } from "next-themes";

export const LoginHeader = () => {
  const { resolvedTheme } = useTheme();

  const LOGO_PATH =
    resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";

  return (
    <div className="flex flex-row justify-between items-center">
      <Image width={90} height={82.44} src={LOGO_PATH} alt="logo" />
      <SwitchTheme />
    </div>
  );
};
