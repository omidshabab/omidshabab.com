import SidebarItem from "../SidebarItem";

const CourseSection = () => {
     return (
          <div className="flex flex-col gap-y-2">
               Courses
               <SidebarItem>
                    Your Created Courses
               </SidebarItem>

               <SidebarItem>
                    Add a new amazing Course
               </SidebarItem>
          </div>
     );
}

export default CourseSection;