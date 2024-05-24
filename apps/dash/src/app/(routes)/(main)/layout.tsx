import { checkAuth } from "@/lib/auth/utils";
import TrpcProvider from "@/lib/trpc/Provider";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default async function layout({
     children
}: {
     children: ReactNode
}) {
     await checkAuth();

     return (
          <TrpcProvider cookies={cookies().toString()}>
               <div className="flex w-full h-full">
                    {children}
               </div>
          </TrpcProvider>
     )
}