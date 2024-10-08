import { cn } from "@repo/ui/lib/utils";
import Sidebar from "./Sidebar";
import CourseSection from "./sidebar/sections/CourseSection";
import KeySection from "./sidebar/sections/KeySection";
import PortfolioSection from "./sidebar/sections/PortfolioSection";
import PostSection from "./sidebar/sections/PostSection";
import ProfileSection from "./sidebar/sections/ProfileSection";
import { useState } from "react";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { Card, ProgressBar } from '@tremor/react';
import ComponentSection from "./sidebar/sections/ComponentSection";
import BookSection from "./sidebar/sections/BookSection";
import PodcastSection from "./sidebar/sections/PodcastSection";
import { LangDir } from "@/lib/fonts";
import { useLocale } from "next-intl";
import { trpc } from "@/lib/trpc/client";
import Loading from "@/components/Loading";
import SidebarSkeleton from "./sidebar/SidebarSkeleton";
import UserSection from "./sidebar/sections/UserSection";

const SidebarDesktop = () => {
     const user = trpc.account.getUser.useQuery().data?.user

     const locale = useLocale()

     const dir = LangDir(locale)

     return (
          <Sidebar className={cn(
               "ltr:-translate-x-full ltr:rounded-tr-[20px] rtl:translate-x-full rtl:rounded-tl-[20px]",
               "bg-primary/[3%] peer absolute inset-y-0 z-30 hidden duration-300 ease-in-out data-[state=open]:translate-x-0 md:flex md:flex-col md:justify-between md:min-w-[250px] md:max-w-[250px]"
          )}>
               {user && (
                    <ScrollArea dir={dir}>
                         <div className="flex flex-col justify-between gap-y-[20px] px-[25px] py-[15px] pb-[30px]">
                              {(user.role !== "user") && (
                                   <>
                                        {/* Posts Section */}
                                        <PostSection />

                                        {/* Portfolio Section */}
                                        <PortfolioSection />

                                        {/* Courses Section */}
                                        <CourseSection />

                                        {/* Component Section */}
                                        <ComponentSection />

                                        {/* Book Section */}
                                        <BookSection />

                                        {/* Podcast Section */}
                                        <PodcastSection />

                                        {/* User Section */}
                                        <UserSection />

                                        {/* Key Section */}
                                        <KeySection />
                                   </>
                              )}

                              {/* Profile Section */}
                              <ProfileSection />
                         </div>
                    </ScrollArea>
               )}

               {!user && (
                    <div className="flex flex-col justify-between gap-y-[20px] px-[25px] py-[15px]">
                         {[1, 2, 3, 4, 5].map((index) => (
                              <SidebarSkeleton key={index} />
                         ))}
                    </div>
               )}

               {/* -- Subscription -- */}
               {/* <div className="flex w-full items-center justify-center h-[100px] bottom-0 bg-orange-50 border-t-[1px] border-primary/5">
                    <Card className="mx-auto max-w-sm bg-transparent ring-0">
                         <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
                              <span>12 of 30 days left</span>
                              <span>45%</span>
                         </p>
                         <ProgressBar value={45} color="orange" className="mt-[5px] opacity-20 bg-opacity-10" />
                         <p className="text-[12px] text-slate-600 font-normal py-[5px]">
                              consectetur adipisicing elit
                         </p>
                    </Card>
               </div> */}
          </Sidebar>
     );
}

export default SidebarDesktop;