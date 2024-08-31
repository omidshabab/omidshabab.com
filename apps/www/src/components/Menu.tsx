import React from "react"
import { defaultRoutes } from "@/config/routes"
import {
     NavigationMenu,
     NavigationMenuContent,
     NavigationMenuItem,
     NavigationMenuLink,
     NavigationMenuList,
     NavigationMenuTrigger,
} from "@repo/ui/components/navigation-menu"
import { cn } from "@repo/ui/lib/utils"
import { useTranslations } from "next-intl"

const Menu = ({
     dir = "ltr"
}: {
     dir?: "rtl" | "ltr"
}) => {
     const tGeneral = useTranslations("general");
     const tMenu = useTranslations("menu");

     const tabs: { title: string; href: string; description: string }[] = [
          {
               title: `${tMenu("blog")} - ${tMenu("posts")}`,
               href: defaultRoutes.blog,
               description: tMenu("blog_desc"),
          },
          {
               title: `${tMenu("portfolio")}`,
               href: defaultRoutes.portfolio,
               description: tMenu("portfolio_desc"),
          },
          {
               title: `${tMenu("courses")}`,
               href: defaultRoutes.courses,
               description: tMenu("courses_desc"),
          },
          {
               title: `${tMenu("books")}`,
               href: defaultRoutes.books,
               description: tMenu("books_desc"),
          },
          {
               title: `${tMenu("podcasts")}`,
               href: defaultRoutes.podcasts,
               description: tMenu("podcasts_desc"),
          },
          {
               title: `${tMenu("components")}`,
               href: defaultRoutes.components,
               description: tMenu("components_desc"),
          },
          {
               title: `${tMenu("subscription")}`,
               href: defaultRoutes.subscription,
               description: tMenu("subscription_desc"),
          },
          {
               title: `${tMenu("about")}`,
               href: defaultRoutes.about,
               description: tMenu("about_desc"),
          },
     ];


     return (
          <NavigationMenu dir={dir}>
               <NavigationMenuList>
                    <NavigationMenuItem>
                         <NavigationMenuTrigger className="cursor-pointer">{tGeneral("menu")}</NavigationMenuTrigger>
                         <NavigationMenuContent>
                              <ul className="grid w-[300px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[600px] rtl:grid-rtl">
                                   {tabs.map((tab) => (
                                        <ListItem
                                             key={tab.title}
                                             title={tab.title}
                                             href={tab.href}
                                             className="cursor-pointer">
                                             {tab.description}
                                        </ListItem>
                                   ))}
                              </ul>
                         </NavigationMenuContent>
                    </NavigationMenuItem>
               </NavigationMenuList>
          </NavigationMenu>
     );
}

export default Menu;

const ListItem = React.forwardRef<
     React.ElementRef<"a">,
     React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
     return (
          <li>
               <NavigationMenuLink asChild>
                    <a
                         ref={ref}
                         className={cn(
                              "block select-none space-y-[8px] border-[2px] border-primary/5 rounded-[15px] px-[20px] py-[15px] leading-none no-underline outline-none transition-colors hover:bg-primary/5 hover:text-slate-800 focus:bg-primary/5 focus:text-slate-800",
                              className
                         )}
                         {...props}
                    >
                         <div className="font-medium leading-none text-text text-[16px]">{title}</div>
                         <p className="line-clamp-2 text-sm leading-snug text-slate-600 font-light">
                              {children}
                         </p>
                    </a>
               </NavigationMenuLink>
          </li>
     )
})
ListItem.displayName = "ListItem"
