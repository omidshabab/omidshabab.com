import { useSelectedLayoutSegments } from "next/navigation";
import SidebarItem from "../SidebarItem";
import { dashRoutes } from "@/config/routes";
import { useTranslations } from "next-intl";

const ProfileSection = () => {
  const segments = useSelectedLayoutSegments();

  const tSidebar = useTranslations("sidebar")

  return (
    <div className="flex flex-col gap-y-2">
      {tSidebar("profile")}
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
    </div>
  );
}

export default ProfileSection;