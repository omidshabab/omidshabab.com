import { useSearchParams, useSelectedLayoutSegments } from "next/navigation";
import SidebarItem from "../SidebarItem";
import { dashRoutes } from "@/config/routes";
import { useTranslations } from "next-intl";
import SidebarSection from "../SidebarSection";

const ComponentSection = () => {
     const segments = useSelectedLayoutSegments();

     const searchParams = useSearchParams()

     const id = searchParams.get("id")

     const tSidebar = useTranslations("sidebar")

     return (
          <SidebarSection
          name={tSidebar("components")}>
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
          </SidebarSection>
     );
}

export default ComponentSection;