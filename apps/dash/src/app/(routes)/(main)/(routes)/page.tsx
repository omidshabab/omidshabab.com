import { dashRoutes } from "@/config/routes";
import { redirect } from "next/navigation";

const Page = () => {
  return redirect(dashRoutes.posts)
}

export default Page;