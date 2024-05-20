import { ReactNode } from "react";

interface SidebarSectionProps {
     name?: string,
     children?: ReactNode
}

const SidebarSection = ({
     name,
     children,
}: SidebarSectionProps) => {
     return (
          <div className="flex flex-col gap-y-2">
               {name}
               {children}
          </div>
     );
}

export default SidebarSection;