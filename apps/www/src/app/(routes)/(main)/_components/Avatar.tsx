import AvatarIcon from "@/src/components/AvatarIcon";

const Avatar = () => {
     return (
          <div className="relative aspect-square w-[80px] bg-primary/5 rounded-full">
               <div className="absolute w-[30px] aspect-square bg-primary/5 rounded-full bottom-0 right-0 backdrop-blur-sm">
                    <AvatarIcon />
               </div>
          </div>
     );
}

export default Avatar;