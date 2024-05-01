"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { LogOut } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import IconButton from "../buttons/icon-button";

export default function LogoutButton() {
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const tRegister = useTranslations("register")

  const handleSignOut = async () => {
    setIsLoggingOut(true);


    //

    return router.refresh();
  };

  return (
    <IconButton
      onClick={() => handleSignOut()}
      disabled={isLoggingOut}>
      <LogOut
        size={25}
        className="text-orange-600" />
    </IconButton>
  );
}
