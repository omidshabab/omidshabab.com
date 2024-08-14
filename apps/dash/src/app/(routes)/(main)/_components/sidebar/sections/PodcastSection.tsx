import { dashRoutes } from "@/config/routes";
import SidebarItem from "../SidebarItem";
import { useSearchParams, useSelectedLayoutSegments } from "next/navigation";
import { useTranslations } from "next-intl";
import SidebarSection from "../SidebarSection";

const PodcastSection = () => {
     const segments = useSelectedLayoutSegments();

     const searchParams = useSearchParams()

     const id = searchParams.get("id")

     const tSidebar = useTranslations("sidebar")

     return (
          <SidebarSection
               name={tSidebar("podcasts")}
               soon={true}>
               <SidebarItem
                    href={dashRoutes.podcasts}
                    active={segments[0] === "podcasts" && segments[1] === undefined}>
                    {tSidebar("created_podcasts")}
               </SidebarItem>

               <SidebarItem
                    href={dashRoutes.createPodcast}
                    active={segments[0] === "podcasts" && segments[1] === "create" && id === null && true}>
                    {tSidebar("add_podcast")}
               </SidebarItem>
          </SidebarSection>
     );
}

export default PodcastSection;