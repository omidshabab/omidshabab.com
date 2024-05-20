import { cn } from "@repo/ui/lib/utils";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface SidebarItemProps {
     children: ReactNode
     href?: string
     active?: boolean | false
}

const SidebarItem = ({
     children,
     href,
     active = false
}: SidebarItemProps) => {
     const router = useRouter()

     return (
          <div
               onClick={() => href && router.push(href)}
               className={cn(
                    "flex bg-primary/5 rounded-[10px] px-[10px] py-[8px] text-[14px] cursor-pointer hover:bg-primary/10 transition-all duration-300 line-clamp-2 text-ellipsis",
                    active && "bg-primary/10"
               )}>
               {children}
          </div>
     );
}

export default SidebarItem;