import ProfileAvatar from "@/components/ProfileAvatar";
import ToggleButton from "./ToggleButton";

const Navbar = () => {
     return (
          <div className="flex sticky top-0 z-50 items-center justify-between gap-x-5 shrink-0 px-[25px] py-[20px]">
               <div className="flex gap-x-5 items-center">
                    <ToggleButton />

                    <div>
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                         reiciendis a sit ducimus exercitationem deleniti incidunt fugit
                    </div>
               </div>

               <ProfileAvatar />
          </div>
     );
}

export default Navbar;