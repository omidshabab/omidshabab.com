import { dashRoutes } from "@/config/routes";
import SidebarItem from "../SidebarItem";
import { useSearchParams, useSelectedLayoutSegments } from "next/navigation";
import { useTranslations } from "next-intl";

const PodcastSection = () => {
     const segments = useSelectedLayoutSegments();

     const searchParams = useSearchParams()

     const id = searchParams.get("id")

     const tSidebar = useTranslations("sidebar")

     return (
          <div className="flex flex-col gap-y-2">
               {tSidebar("podcasts")}
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
          </div>
     );
}

export default PodcastSection;