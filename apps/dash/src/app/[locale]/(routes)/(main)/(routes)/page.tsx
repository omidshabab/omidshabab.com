"use client"

import { useState } from "react"

import SidebarDesktop from "../_components/SidebarDesktop";
import ToggleButton from "../_components/ToggleButton"
import { cn } from "@repo/ui/lib/utils";

const Page = () => {
  const [direction] = useState(document.documentElement.dir);

  return (
    <div className="flex flex-1 flex-col w-full h-full">
      <div className="flex sticky top-0 z-50 items-center gap-x-5 shrink-0 px-[25px] py-[20px]">
        <ToggleButton />

        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid reiciendis a sit ducimus exercitationem deleniti incidunt fugit
        </div>
      </div>

      <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
        <SidebarDesktop />

        <div className={cn(
          direction === "ltr" ? "pl-0 peer-[[data-state=open]]:md:pl-[250px]" : "pr-0 peer-[[data-state=open]]:md:pr-[250px]",
          "group w-full h-full overflow-auto",
        )}>
          <div className="w-full h-full px-[25px] text-[20px] font-medium leading-[2.5rem]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </div>
        </div>

      </div>
    </div>
  );
}

export default Page
