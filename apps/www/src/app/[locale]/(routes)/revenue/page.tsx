import { useTranslations } from "next-intl";

const Page = () => {
     const tGeneral = useTranslations("general");

     return (
          <div>{tGeneral("soon")} ...</div>
     );
}

export default Page;