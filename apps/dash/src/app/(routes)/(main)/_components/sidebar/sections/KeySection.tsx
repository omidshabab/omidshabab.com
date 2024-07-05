import { dashRoutes } from "@/config/routes";
import SidebarItem from "../SidebarItem";
import { useSelectedLayoutSegments } from "next/navigation";
import { useTranslations } from "next-intl";

const KeySection = () => {
     const segments = useSelectedLayoutSegments();

     const tSidebar = useTranslations("sidebar")

     return (
          <div className="flex flex-col gap-y-2">
               {tSidebar("api_keys")}
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
          </div>
     );
}

export default KeySection;