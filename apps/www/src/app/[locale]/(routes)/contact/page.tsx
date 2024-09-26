import Container from "@/components/Container";
import { useTranslations } from "next-intl";

const Page = () => {
     const tGeneral = useTranslations("general");

     return (
          <Container>
               <div>{tGeneral("soon")} ...</div>
          </Container>
     );
}

export default Page;