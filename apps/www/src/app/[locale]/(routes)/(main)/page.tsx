"use client"

import BlogSection from "./_components/sections/BlogSection";
import IntroSection from "./_components/sections/IntroSection";
import LastSection from "./_components/sections/LastSection";
import PortfolioSection from "./_components/sections/PortfolioSection";

const Page = () => {
     return (
          <div className="flex flex-col sm:flex-row w-full h-full gap-x-[30px] py-0 sm:py-[15px]">
               <div className="grid grid-cols-12 grid-flow-dense gap-5">
                    <IntroSection />

                    <PortfolioSection />

                    <BlogSection />

                    <LastSection />
               </div>
          </div>
     );
}

export default Page;