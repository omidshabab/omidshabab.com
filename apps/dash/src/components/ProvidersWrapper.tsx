import { SidebarProvider } from "@/lib/hooks/useSidebar";
import { ThemeProviderProps } from "next-themes/dist/types";

export default function Providers({
     children
}: ThemeProviderProps) {
     return (
          <SidebarProvider>
               {children}
          </SidebarProvider>
     )
}