import { SidebarProvider } from "@/lib/hooks/useSidebar";
import { ThemeProviderProps } from "next-themes/dist/types";

export default function Providers({
     children,
     ...props
}: ThemeProviderProps) {
     return (
          <SidebarProvider>
          {children}
     </SidebarProvider>
     )
}