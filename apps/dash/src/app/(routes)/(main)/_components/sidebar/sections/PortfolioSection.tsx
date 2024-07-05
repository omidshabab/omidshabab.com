import { useSearchParams, useSelectedLayoutSegments } from "next/navigation";
import SidebarItem from "../SidebarItem";
import { dashRoutes } from "@/config/routes";
import { useTranslations } from "next-intl";

const PortfolioSection = () => {
     const segments = useSelectedLayoutSegments();

     const searchParams = useSearchParams()

     const id = searchParams.get("id")

     const tSidebar = useTranslations("sidebar")

     return (
          <div className="flex flex-col gap-y-2">
               {tSidebar("portfolio")}
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
          </div>
     );
}

export default PortfolioSection;