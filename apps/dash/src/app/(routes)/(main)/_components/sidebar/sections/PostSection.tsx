import { useSearchParams, useSelectedLayoutSegments } from "next/navigation";
import SidebarItem from "../SidebarItem";
import { dashRoutes } from "@/config/routes";
import { useTranslations } from "next-intl";

const PostSection = () => {
     const segments = useSelectedLayoutSegments();

     const searchParams = useSearchParams()

     const id = searchParams.get("id")

     const tSidebar = useTranslations("sidebar")

     return (
          <div className="flex flex-col gap-y-2">
               {tSidebar("posts")}
               <SidebarItem
                    href={dashRoutes.posts}
                    active={segments[0] === "posts" && segments[1] === undefined}>
                    {tSidebar("created_posts")}
               </SidebarItem>

               <SidebarItem
                    href={dashRoutes.createPost}
                    active={segments[0] === "posts" && segments[1] === "create" && id === null && true}>
                    {tSidebar("add_post")}
               </SidebarItem>
          </div>
     );
}

export default PostSection;