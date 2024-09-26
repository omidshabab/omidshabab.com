"use client"

import { Button } from '@repo/ui/components/button'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export default function NotFound() {
     const router = useRouter()

     const tNotFound = useTranslations("not_found")

     return (
          <div className="flex flex-col w-full min-h-[650px] justify-center items-center gap-y-[35px]">
               <div className="flex flex-col gap-y-[10px] text-center">
                    <h2 className="text-[25px] font-bold text-slate-800">{tNotFound("title")}</h2>
                    <p className="text-[15px] text-slate-600">{tNotFound("desc")}</p>
               </div>
               <Button
                    variant="secondary"
                    size="sm"
                    className="px-[28px] py-[25px] rounded-[12px]"
                    onClick={() => router.push("/")}>
                    {tNotFound("button")}
               </Button>
          </div>
     )
}