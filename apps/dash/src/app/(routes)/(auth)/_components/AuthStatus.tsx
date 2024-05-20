import { RegisterStatus } from "@/types";
import { useTranslations } from "next-intl";

const AuthStatus = ({
     status
}: {
     status: RegisterStatus
}) => {
     const tRegister = useTranslations("register")

     return (
          <div>
               {status === "success" && (
                    <div>
                         {tRegister("success")}
                    </div>
               )}
               {status === "error" && (
                    <div>
                         {tRegister("error")}
                    </div>
               )}
          </div>
     );
}

export default AuthStatus;