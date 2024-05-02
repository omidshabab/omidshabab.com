import BlogSection from "./_components/sections/BlogSection";
import IntroSection from "./_components/sections/IntroSection";
import LastSection from "./_components/sections/LastSection";
import PortfolioSection from "./_components/sections/PortfolioSection";

const Page = () => {
     return (
          <div className="grid grid-cols-12 grid-flow-dense gap-5">
               <IntroSection />

               <PortfolioSection />

               <BlogSection />

               <LastSection />
          </div>
     );
}

export default Page;