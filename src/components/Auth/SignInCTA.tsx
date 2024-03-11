import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export const SignInCTA = () => {
  const pathname = usePathname();
  const isRegisterRoute = pathname === "/register";

  return (
    <div className="">
      <p className="text-sm text-neutral-600 dark:text-neutral-400 tracking-widest">
        {isRegisterRoute ? (
          <>Já tem uma conta? </>
        ) : (
          <>Ainda não tem conta? </>
        )}
        <Link
          className="text-primaryHover hover:text-primary dark:text-primary hover:dark:text-primaryHover transition-all font-medium"
          href={isRegisterRoute ? "/login" : "/register"}
        >
          {isRegisterRoute ? "Faça login!" : "Registre-se!"}
        </Link>
      </p>
    </div>
  );
};
