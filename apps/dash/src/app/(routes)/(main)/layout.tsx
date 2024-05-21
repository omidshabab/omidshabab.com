import { checkAuth } from "@/lib/auth/utils";
import { ReactNode } from "react";

export default async function layout({
     children
}: {
     children: ReactNode
}) {
     await checkAuth();

     return (
          <div className="flex w-full h-full">
               {children}
          </div>
     )
}