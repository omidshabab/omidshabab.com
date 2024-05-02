import SidebarItem from "../SidebarItem";

const PostSection = () => {
     return (
          <div className="flex flex-col gap-y-2">
               Posts
               <SidebarItem active>
                    Lorem ipsum dolor Lorem ipsum dolor
               </SidebarItem>

               <SidebarItem>
                    Lorem ipsum dolor
               </SidebarItem>
          </div>
     );
}

export default PostSection;