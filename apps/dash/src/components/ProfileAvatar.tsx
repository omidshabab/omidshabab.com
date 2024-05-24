"use client"

import { ChevronRightIcon, LanguagesIcon, PaletteIcon, Settings2Icon } from "lucide-react";
import Avatar from "./Avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@repo/ui/components/ui/dropdown-menu";
import { useLayoutEffect, useState } from "react";
import LogoutItem from "./auth/LogoutItem";

const ProfileAvatar = () => {
     const [direction, setDirection] = useState<string>();

     useLayoutEffect(() => {
          if (typeof document !== "undefined") {
               setDirection(document.documentElement.dir);
          }
     }, []);

     return (
          <DropdownMenu>
               <DropdownMenuTrigger className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-offset-0">
                    <Avatar />
               </DropdownMenuTrigger>
               <DropdownMenuContent
                    align={direction === "ltr" ? "end" : "start"}
                    className="w-full mt-[5px]">
                    <DropdownMenuItem className="flex gap-x-2 text-slate-800">
                         <LanguagesIcon className="w-3 h-3 sm:w-4 sm:h-4 aspect-square" />
                         <div className="flex-grow">
                              Language
                         </div>
                         <ChevronRightIcon className="w-3 h-3 sm:w-4 sm:h-4 aspect-square" />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex gap-x-2 text-slate-800">
                         <PaletteIcon className="w-3 h-3 sm:w-4 sm:h-4 aspect-square" />
                         <div className="flex-grow">
                              Theme
                         </div>
                         <ChevronRightIcon className="w-3 h-3 sm:w-4 sm:h-4 aspect-square" />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex gap-x-2 text-slate-800">
                         <Settings2Icon className="w-3 h-3 sm:w-4 sm:h-4 aspect-square" />
                         <div className="flex-grow">
                              Settings
                         </div>
                         <ChevronRightIcon className="w-3 h-3 sm:w-4 sm:h-4 aspect-square" />
                    </DropdownMenuItem>
                    <LogoutItem />
               </DropdownMenuContent>
          </DropdownMenu>
     );
}

export default ProfileAvatar;