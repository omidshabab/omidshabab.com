import { cn } from "@repo/ui/lib/utils";
import Block from "../Block";
import CallToActionLink from "@/components/CallToActionLink";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { defaultRoutes } from "@/config/routes";

const BlogCard = ({
     className,
     text,
     href = defaultRoutes.default,
     cta
}: {
     className?: string,
     text?: string,
     href?: string,
     cta?: boolean | false
}) => {
     const router = useRouter()

     const tGeneral = useTranslations("general");

     return (
          <Block
               onClick={() => router.push(href)}
               card={cn(
                    "md:col-span-6 min-h-[250px] cursor-pointer hover:bg-primary/10 transition-all duration-500",
                    className
               )}
               content="flex flex-col justify-end gap-y-[15px]">
               <div className="line-clamp-2">
                    {text ?? tGeneral("default_title")}
               </div>
               {cta && <CallToActionLink text={tGeneral("read_now")} />}
          </Block>
     );
}

export default BlogCard;