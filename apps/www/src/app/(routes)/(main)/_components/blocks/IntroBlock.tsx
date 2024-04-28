import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Block from "../Block";
import Avatar from "../Avatar";

const IntroBlock = () => {
     return (
          <Block className="md:col-span-4 row-span-4 flex flex-col gap-y-[20px]">
               <Avatar />
               <div className="flex flex-col gap-y-[5px]">
                    <div className="text-[22px] font-semibold">
                         Lorem ipsum dolor sit amet
                    </div>
                    <div className="text-[18px] leading-[1.8rem] text-foreground">
                         Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </div>
               </div>
               <div className="flex gap-x-[8px] items-center text-[15px] cursor-pointer text-primary font-medium hover:opacity-60 transition-all duration-500">
                    Contact me
                    <ArrowRightIcon className="w-[15px]" />
               </div>
          </Block>
     );
}

export default IntroBlock;