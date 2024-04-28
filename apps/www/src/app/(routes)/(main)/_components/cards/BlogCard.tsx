import { cn } from "@repo/ui/lib/utils";
import Block from "../Block";

const BlogCard = ({
     className
}: {
     className?: string
}) => {
     return (
          <Block className={cn(
               "md:col-span-6",
               className
          )}>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, nisi, molestiae iusto rerum dignissimos maxime consequuntur aspernatur doloribus iste voluptatum recusandae saepe aliquam. Accusamus magnam qui, voluptates inventore saepe quam.
          </Block>
     );
}

export default BlogCard;