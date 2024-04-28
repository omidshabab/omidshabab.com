import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Block from "../Block";
import Avatar from "../Avatar";
import CallToActionLink from "@/src/components/CallToActionLink";

const IntroBlock = () => {
     return (
          <Block card="md:col-span-4 row-span-4">
               <Avatar />
               <div className="flex flex-col gap-y-[5px]">
                    <div className="text-[22px] font-semibold">
                         Lorem ipsum dolor sit amet
                    </div>
                    <div className="text-[18px] leading-[1.8rem] text-foreground">
                         Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </div>
               </div>
               <CallToActionLink text="Contact me" />
          </Block>
     );
}

export default IntroBlock;