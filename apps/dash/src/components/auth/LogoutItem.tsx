"use client"

import { DropdownMenuItem } from "@repo/ui/components/ui/dropdown-menu"
import { LogOutIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const LogoutItem = () => {
     const router = useRouter();

     const [isLoggingOut, setIsLoggingOut] = useState(false)

     const tRegister = useTranslations("register")

     const handleSignOut = async () => {
          setIsLoggingOut(true);


          // toast.promise(signOut().then(() => {
          // setIsLoggingOut(false);
          // }), {
          // loading: `${tRegister("in_progress")}`,
          // })

          setIsLoggingOut(false)

          return router.refresh();
     };

     return (
          <DropdownMenuItem
               onClick={() => handleSignOut()}
               disabled={isLoggingOut}
               className="flex gap-x-2 text-text">
               <LogOutIcon className="w-3 h-3 sm:w-4 sm:h-4 aspect-square" />
               Logout
          </DropdownMenuItem>
     );
}

export default LogoutItem;