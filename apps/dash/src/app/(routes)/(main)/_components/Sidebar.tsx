import { useSidebar } from "@/lib/hooks/useSidebar";
import { cn } from "@repo/ui/lib/utils";

export interface SidebarProps extends React.ComponentProps<'div'> { }

const Sidebar = ({ className, children }: SidebarProps) => {
     const { isSidebarOpen, isLoading } = useSidebar()

     return (
          <div
               data-state={isSidebarOpen && !isLoading ? 'open' : 'closed'}
               className={cn("h-full", className)}>
               {children}
          </div>
     );
}

export default Sidebar;