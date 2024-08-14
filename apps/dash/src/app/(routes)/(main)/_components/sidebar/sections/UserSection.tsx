import { useSearchParams, useSelectedLayoutSegments } from "next/navigation";
import SidebarItem from "../SidebarItem";
import { dashRoutes } from "@/config/routes";
import { useTranslations } from "next-intl";
import SidebarSection from "../SidebarSection";

const UserSection = () => {
     const segments = useSelectedLayoutSegments();

     const searchParams = useSearchParams()

     const id = searchParams.get("id")

     const tSidebar = useTranslations("sidebar")

     return (
          <SidebarSection
               name={tSidebar("users")}>
               <SidebarItem
                    href={dashRoutes.users}
                    active={segments[0] === "users" && segments[1] === undefined}>
                    {tSidebar("website_users")}
               </SidebarItem>

               <SidebarItem
                    href={dashRoutes.usersAnalytics}
                    active={segments[0] === "users" && segments[1] === "analytics" && id === null && true}>
                    {tSidebar("users_analytics")}
               </SidebarItem>
          </SidebarSection>
     );
}

export default UserSection;