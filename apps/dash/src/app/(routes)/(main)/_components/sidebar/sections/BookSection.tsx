import { dashRoutes } from "@/config/routes";
import SidebarItem from "../SidebarItem";
import { useSearchParams, useSelectedLayoutSegments } from "next/navigation";
import { useTranslations } from "next-intl";
import SidebarSection from "../SidebarSection";

const BookSection = () => {
     const segments = useSelectedLayoutSegments();

     const searchParams = useSearchParams()

     const id = searchParams.get("id")

     const tSidebar = useTranslations("sidebar")

     return (
          <SidebarSection
               name={tSidebar("books")}
               soon={true}>
               <SidebarItem
                    href={dashRoutes.books}
                    active={segments[0] === "books" && segments[1] === undefined}>
                    {tSidebar("created_books")}
               </SidebarItem>

               <SidebarItem
                    href={dashRoutes.createBook}
                    active={segments[0] === "books" && segments[1] === "create" && id === null && true}>
                    {tSidebar("add_book")}
               </SidebarItem>
          </SidebarSection>
     );
}

export default BookSection;