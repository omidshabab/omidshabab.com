import { SiGithub, SiInstagram, SiTwitter, SiX, SiYoutube } from "react-icons/si";
import SocialCard from "../cards/SocialCard";

const SocialBlock = () => {
     return (
          <div className="col-span-12 md:col-span-4 md:row-span-4 grid grid-cols-4 gap-3">
               <SocialCard
                    className=" bg-red-600/90 hover:bg-red-600">
                    <SiYoutube size={45} className="text-white" />
               </SocialCard>

               <SocialCard className=" bg-black/90 hover:bg-black">
                    <SiGithub size={45} className="text-white" />
               </SocialCard>

               <SocialCard className="bg-blue-600/90 hover:bg-blue-600">
                    <SiX size={45} className="text-white" />
               </SocialCard>

               <SocialCard className="bg-pink-600/90 hover:bg-pink-600">
                    <SiInstagram size={45} className="text-white" />
               </SocialCard>
          </div>
     );
}

export default SocialBlock;