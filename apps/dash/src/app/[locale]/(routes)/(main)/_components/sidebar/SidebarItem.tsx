import { cn } from "@repo/ui/lib/utils";
import { ReactNode } from "react";

const SidebarItem = ({
     children,
     active = false
}: {
     children: ReactNode,
     active?: boolean
}) => {
     return (
          <div className={cn(
               "flex bg-primary/5 rounded-[10px] px-[10px] py-[8px] text-[14px] cursor-pointer hover:bg-primary/10 transition-all duration-300 line-clamp-2 text-ellipsis",
               active && "bg-primary/10"
          )}>
               {children}
          </div>
     );
}

export default SidebarItem;