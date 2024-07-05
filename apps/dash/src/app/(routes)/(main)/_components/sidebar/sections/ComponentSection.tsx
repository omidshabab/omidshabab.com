import { useSearchParams, useSelectedLayoutSegments } from "next/navigation";
import SidebarItem from "../SidebarItem";
import { dashRoutes } from "@/config/routes";
import { useTranslations } from "next-intl";

const ComponentSection = () => {
     const segments = useSelectedLayoutSegments();

     const searchParams = useSearchParams()

     const id = searchParams.get("id")

     const tSidebar = useTranslations("sidebar")

     return (
          <div className="flex flex-col gap-y-2">
               {tSidebar("components")}
               <SidebarItem
                    href={dashRoutes.components}
                    active={segments[0] === "components" && segments[1] === undefined}>
                    {tSidebar("created_components")}
               </SidebarItem>

               <SidebarItem
                    href={dashRoutes.createComponent}
                    active={segments[0] === "components" && segments[1] === "create" && id === null && true}>
                    {tSidebar("add_component")}
               </SidebarItem>
          </div>
     );
}

export default ComponentSection;