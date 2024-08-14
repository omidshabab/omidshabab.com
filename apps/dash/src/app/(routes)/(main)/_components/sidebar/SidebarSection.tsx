"use client"

import { capitalize } from "@/lib/utils";
import { cn } from "@repo/ui/lib/utils";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

interface SidebarSectionProps {
     name?: string
     soon?: boolean
     children?: ReactNode
}

const SidebarSection = ({
     name,
     soon = false,
     children,
}: SidebarSectionProps) => {
     const tGeneral = useTranslations("general")

     return (
          <div className="flex flex-col gap-y-2">
               <div className="flex gap-x-[10px] items-center">
                    {name}
                    {soon && <span className="flex items-start justify-center text-text text-[12px] rounded-full bg-primary/5 px-[6px] py-[3px]">{capitalize(tGeneral("soon"))}</span>}
               </div>
               {children}
          </div>
     );
}

export default SidebarSection;