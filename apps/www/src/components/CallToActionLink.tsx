import { ArrowRightIcon } from "lucide-react";

const CallToActionLink = ({
     text
}: {
     text: string
}) => {
     return (
          <div className="flex gap-x-[8px] items-center text-[15px] cursor-pointer text-primary font-medium hover:opacity-60 transition-all duration-500">
               {text}
               <ArrowRightIcon className="w-[15px] rtl:rotate-180" />
          </div>
     );
}

export default CallToActionLink;