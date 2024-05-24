import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const Avatar = ({
     children,
     link,
}: {
     children?: ReactNode,
     link?: string
}) => {
     const router = useRouter()

     return (
          <div
               onClick={() => link && router.push(link)}
               className="w-[40px] h-[40px] aspect-square bg-primary/5 rounded-full cursor-pointer">
               {children}
          </div>
     );
}

export default Avatar;