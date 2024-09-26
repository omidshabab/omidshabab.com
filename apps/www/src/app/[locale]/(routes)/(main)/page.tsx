"use client"

import { useEffect, useRef } from "react";
import Hero from "./_components/Hero";
import Posts from "./_components/Posts";
import { usePathname } from "next/navigation";

const Page = () => {
     const scrollRef = useRef<HTMLDivElement | null>(null);
     const pathname = usePathname()

     useEffect(() => {
          const initLocomotiveScroll = async () => {
               if (!scrollRef.current) return;

               const LocomotiveScroll = (await import('locomotive-scroll')).default;
               const locomotiveScroll = new LocomotiveScroll({
                    el: scrollRef.current,
                    smooth: true,
               });

               return () => {
                    locomotiveScroll.destroy();
               };
          };

          initLocomotiveScroll();
     }, [pathname]);

     return (
          <div
               className="flex flex-col w-full cursor-default">
               <Hero />

               <Posts />
          </div>
     );
}

export default Page;