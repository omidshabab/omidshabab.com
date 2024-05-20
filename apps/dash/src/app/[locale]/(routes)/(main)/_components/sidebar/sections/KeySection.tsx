import SidebarItem from "../SidebarItem";

const KeySection = () => {
     return (
          <div className="flex flex-col gap-y-2">
               API Keys
               <SidebarItem>
                    Your Created API Keys
               </SidebarItem>

               <SidebarItem>
                    Usage of API Keys
               </SidebarItem>
          </div>
     );
}

export default KeySection;