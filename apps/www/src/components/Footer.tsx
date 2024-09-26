import { useTranslations } from "next-intl";
import Container from "./Container";

const Footer = () => {
     const tGeneral = useTranslations("general");

     const year = () => new Date().getFullYear()

     return (
          <Container>
               <div className="flex w-full items-center justify-between gap-x-5 py-[30px]">
                    <div className="flex gap-x-[5px] font-light text-slate-600">{year()} / {tGeneral("omidshababcom")} <span className="hidden sm:block"> - {tGeneral("copyright")}</span></div>
               </div>
          </Container>
     );
}

export default Footer;