import { useTranslations } from "next-intl";

const Footer = () => {
     const tGeneral = useTranslations("general");

     const year = () => new Date().getFullYear()

     return (
          <div className="flex w-full items-center justify-between gap-x-5 py-[30px]">
               <div className="flex gap-x-[5px] font-light text-slate-600">{year()} / {tGeneral("omidshababcom")} <span className="hidden sm:block"> - {tGeneral("copyright")}</span></div>
          </div>
     );
}

export default Footer;