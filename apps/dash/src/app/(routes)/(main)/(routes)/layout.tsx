"use client"

import { ReactNode, useState } from "react"

import SidebarDesktop from "../_components/SidebarDesktop";
import ToggleButton from "../_components/ToggleButton"
import { cn } from "@repo/ui/lib/utils";
import ProfileAvatar from "@/components/ProfileAvatar";
import { Spacer } from "@nextui-org/spacer";
import Navbar from "../_components/Navbar";

export default function Layout({ children }: { children?: ReactNode }) {
     const [direction, setDirection] = useState(document.documentElement.dir);

     return (
          <div className="flex flex-1 flex-col w-full h-full">
               <Navbar />

               <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
                    <SidebarDesktop />

                    <Spacer className="peer-[[data-state=open]]:lg:w-[10px]" />

                    <div
                         className={cn(
                              direction === "ltr"
                                   ? "pl-0 peer-[[data-state=open]]:md:pl-[250px]"
                                   : "pr-0 peer-[[data-state=open]]:md:pr-[250px]",
                              "group w-full h-full overflow-auto"
                         )}>

                         <div className="flex flex-col items-center w-full h-full px-[25px] text-[20px] font-medium leading-[2.5rem]">
                              <div className="w-full max-w-6xl h-full">
                                   {children}
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}
