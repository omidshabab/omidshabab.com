import { useSearchParams, useSelectedLayoutSegments } from "next/navigation";
import SidebarItem from "../SidebarItem";
import { dashRoutes } from "@/config/routes";
import { useTranslations } from "next-intl";
import SidebarSection from "../SidebarSection";

const PortfolioSection = () => {
     const segments = useSelectedLayoutSegments();

     const searchParams = useSearchParams()

     const id = searchParams.get("id")

     const tSidebar = useTranslations("sidebar")

     return (
          <SidebarSection
               name={tSidebar("portfolio")}>
               <SidebarItem
                    href={dashRoutes.portfolio}
                    active={segments[0] === "portfolio" && segments[1] === undefined}>
                    {tSidebar("created_portfolio")}
               </SidebarItem>

               <SidebarItem
                    href={dashRoutes.createPortfolio}
                    active={segments[0] === "portfolio" && segments[1] === "create" && id === null && true}>
                    {tSidebar("add_portfolio")}
               </SidebarItem>
          </SidebarSection>
     );
}

export default PortfolioSection;