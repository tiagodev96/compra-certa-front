import { GridBackground, LoginHeader } from "@/components";
import { Separator } from "@/components/ui/separator";
import React from "react";

const Login = () => {
  return (
    <div className="sectionContainer flex items-center justify-center bg-neutral-50 w-screen h-screen">
      <div className="grid grid-cols-2 max-w-[1200px] container h-full items-center justify-center max-h-[600px] rounded-lg drop-shadow-2xl">
        <div className="bg-neutral-200 w-full h-full rounded-tl-lg rounded-bl-lg"></div>

        <div className="bg-neutral-950 h-full overflow-hidden w-full rounded-tr-lg rounded-br-lg px-8 py-8">
          <GridBackground>
            <div className="flex flex-1 flex-col z-20">
              <LoginHeader />
              <Separator className="mt-8 bg-neutral-200" />
            </div>
          </GridBackground>
        </div>
      </div>
    </div>
  );
};

export default Login;
