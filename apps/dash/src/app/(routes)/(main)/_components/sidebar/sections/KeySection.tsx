import { dashRoutes } from "@/config/routes";
import SidebarItem from "../SidebarItem";
import { useSelectedLayoutSegments } from "next/navigation";
import { useTranslations } from "next-intl";
import SidebarSection from "../SidebarSection";

const KeySection = () => {
     const segments = useSelectedLayoutSegments();

     const tSidebar = useTranslations("sidebar")

     return (
          <SidebarSection
               name={tSidebar("api_keys")}
               soon={true}>
               <SidebarItem
                    href={dashRoutes.keys}
                    active={segments[0] === "keys" && segments[2] === undefined}>
                    {tSidebar("created_api_keys")}
               </SidebarItem>

               <SidebarItem
                    href={dashRoutes.usage}
                    active={segments[0] === "keys" && segments[2] === "usage"}>
                    {tSidebar("usage_api_keys")}
               </SidebarItem>
          </SidebarSection>
     );
}

export default KeySection;