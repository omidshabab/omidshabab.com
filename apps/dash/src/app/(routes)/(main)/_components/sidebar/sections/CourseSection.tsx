import { useSearchParams, useSelectedLayoutSegments } from "next/navigation";
import SidebarItem from "../SidebarItem";
import { dashRoutes } from "@/config/routes";
import { useTranslations } from "next-intl";

const CourseSection = () => {
     const segments = useSelectedLayoutSegments();

     const searchParams = useSearchParams()

     const id = searchParams.get("id")

     const tSidebar = useTranslations("sidebar")

     return (
          <div className="flex flex-col gap-y-2">
               {tSidebar("courses")}
               <SidebarItem
                    href={dashRoutes.courses}
                    active={segments[0] === "courses" && segments[1] === undefined}>
                    {tSidebar("created_courses")}
               </SidebarItem>

               <SidebarItem
                    href={dashRoutes.createCourse}
                    active={segments[0] === "courses" && segments[1] === "create" && id === null && true}>
                    {tSidebar("add_course")}
               </SidebarItem>
          </div>
     );
}

export default CourseSection;