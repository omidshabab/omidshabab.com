"use client"

import { dashRoutes } from "@/config/routes";
import { redirect } from "next/navigation";
import OverviewCard from "../_components/cards/OverviewCard";
import PageStatsCard from "../_components/cards/PageStatsCard";
import ApiStatsCard from "../_components/cards/ApiStatsCard";
import MembersCard from "../_components/cards/MembersCard";
import CourseStatsCard from "../_components/cards/CourseStatsCard";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { useLocale } from "next-intl";
import { LangDir } from "@/lib/fonts";
import IncomeStatsCard from "../_components/cards/IncomeStatsCard";

const Page = () => {
  const locale = useLocale();

  const dir = LangDir(locale)

  return (
    <ScrollArea dir={dir} className="w-full h-full none-scroll-bar overflow-y-hidden">
      <div className="flex flex-col gap-y-[30px] pb-[50px]">
        <OverviewCard />

        <IncomeStatsCard />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {/* <PageStatsCard /> */}
          <ApiStatsCard />
          <CourseStatsCard />
        </div>
        {/* <MembersCard /> */}
      </div>
    </ScrollArea>
  )
}

export default Page;