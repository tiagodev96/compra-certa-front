import Link from "next/link";
import React from "react";

export const SignInCTA = () => {
  return (
    <div className="">
      <p className="text-sm text-neutral-600 dark:text-neutral-400 tracking-widest">
        Ainda não tem conta?{" "}
        <Link
          className="text-primaryHover hover:text-primary dark:text-primary hover:dark:text-primaryHover transition-all font-medium"
          href="/register"
        >
          Registre-se!
        </Link>
      </p>
    </div>
  );
};
