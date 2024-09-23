import { defaultRoutes } from "@/config/routes";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const LocaleSwitcher = () => {
     const router = useRouter()

     const tGeneral = useTranslations("general")
     const tLang = useTranslations("lang")

     const changeLanguage = (locale: string) => {
          router.push(defaultRoutes.default + locale)
     }

     return (
          <div className="hidden sm:flex gap-x-[5px] text-[15px] font-light text-slate-600 cursor-pointer">
               <div onClick={() => changeLanguage("en")}>{tLang("en")}</div> / <div onClick={() => changeLanguage("fa")}>{tLang("fa")}</div>
          </div>
     )
}

export default LocaleSwitcher