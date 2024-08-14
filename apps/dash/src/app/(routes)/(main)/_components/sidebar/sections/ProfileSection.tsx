import { useSelectedLayoutSegments } from "next/navigation";
import SidebarItem from "../SidebarItem";
import { dashRoutes } from "@/config/routes";
import { useTranslations } from "next-intl";
import SidebarSection from "../SidebarSection";

const ProfileSection = () => {
  const segments = useSelectedLayoutSegments();

  const tSidebar = useTranslations("sidebar")

  return (
    <SidebarSection
      name={tSidebar("profile")}>
      <SidebarItem
        href={dashRoutes.profile}
        active={segments[0] === "profile" && segments[2] === undefined}>
        {tSidebar("edit_profile_details")}
      </SidebarItem>

      <SidebarItem
        href={dashRoutes.settings}
        active={segments[0] === "profile" && segments[2] === "settings"}>
        {tSidebar("account_settings")}
      </SidebarItem>
    </SidebarSection>
  );
}

export default ProfileSection;