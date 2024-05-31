import { cn } from "@repo/ui/lib/utils";
import Sidebar from "./Sidebar";
import CourseSection from "./sidebar/sections/CourseSection";
import KeySection from "./sidebar/sections/KeySection";
import PortfolioSection from "./sidebar/sections/PortfolioSection";
import PostSection from "./sidebar/sections/PostSection";
import ProfileSection from "./sidebar/sections/ProfileSection";
import { useState } from "react";

const SidebarDesktop = () => {
     const [direction] = useState(document.documentElement.dir);

     return (
          <Sidebar className={cn(
               direction === "ltr" ? "-translate-x-full rounded-tr-[20px]" : "translate-x-full rounded-tl-[20px]",
               "bg-primary/[3%] peer absolute inset-y-0 z-30 hidden duration-300 ease-in-out data-[state=open]:translate-x-0 md:flex md:flex-col md:justify-between md:min-w-[250px] md:max-w-[250px]"
          )}>
               <div className="flex flex-col justify-between gap-y-[20px] px-[25px] py-[15px]">
                    {/* Posts Section */}
                    <PostSection />

                    {/* Portfolio Section */}
                    <PortfolioSection />

                    {/* Courses Section */}
                    <CourseSection />

                    {/* Key Section */}
                    <KeySection />

                    {/* Profile Section */}
                    <ProfileSection />
               </div>
          </Sidebar>
     );
}

export default SidebarDesktop;