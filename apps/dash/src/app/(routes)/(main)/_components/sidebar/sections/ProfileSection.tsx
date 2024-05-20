import { useSelectedLayoutSegments } from "next/navigation";
import SidebarItem from "../SidebarItem";
import { dashRoutes } from "@/config/routes";

const ProfileSection = () => {
  const segments = useSelectedLayoutSegments();

  return (
    <div className="flex flex-col gap-y-2">
      Profile
      <SidebarItem
        href={dashRoutes.profile}
        active={segments[0] === "profile"}>
        Edit your Profile Account
      </SidebarItem>

      <SidebarItem>
        Settings of your Profile
      </SidebarItem>
    </div>
  );
}

export default ProfileSection;