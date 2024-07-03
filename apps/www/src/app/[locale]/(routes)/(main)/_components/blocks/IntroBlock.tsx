import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Block from "../Block";
import Avatar from "../Avatar";
import CallToActionLink from "@/components/CallToActionLink";
import { useTranslations } from "next-intl";

const IntroBlock = () => {
     const tHomePage = useTranslations("home_page");

     return (
          <Block card="md:col-span-4 row-span-4">
               <Avatar />
               <div className="flex flex-col gap-y-[5px]">
                    <div className="text-[22px] font-semibold">
                         {tHomePage("title")}
                    </div>
                    <div className="text-[18px] leading-[1.8rem] text-foreground">
                         {tHomePage("desc")}
                    </div>
               </div>
               <CallToActionLink text={tHomePage("contact_me")} />
          </Block>
     );
}

export default IntroBlock;