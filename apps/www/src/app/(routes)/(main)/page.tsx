import BlogSection from "./_components/sections/BlogSection";
import IntroSection from "./_components/sections/IntroSection";
import LastSection from "./_components/sections/LastSection";
import PortfolioSection from "./_components/sections/PortfolioSection";

const Page = () => {
     return (
          <div className="mx-auto grid grid-cols-12 grid-flow-dense max-w-6xl gap-5 py-[30px] px-[30px] sm:py-[80px] sm:px-0">
               <IntroSection />

               <PortfolioSection />

               <BlogSection />

               <LastSection />
          </div>
     );
}

export default Page;