import SidebarItem from "../SidebarItem";

const PortfolioSection = () => {
     return (
          <div className="flex flex-col gap-y-2">
               Portfolio
               <SidebarItem>
                    Your Created Portfolio
               </SidebarItem>

               <SidebarItem>
                    Add a new amazing Portfolio
               </SidebarItem>
          </div>
     );
}

export default PortfolioSection;