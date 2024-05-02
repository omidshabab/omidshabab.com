import { getUserAuth } from "@/lib/auth/utils"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { redirect } from "next/navigation"

// Dynamic Metadata based on locales
export async function generateMetadata(): Promise<Metadata> {
  const tRegister = getTranslations("register")
  const tGeneral = getTranslations("general")

  return {
    title: (await tRegister)("title"),
    description: (await tRegister)("description"),
    openGraph: {
      type: "website",
      locale: "en",
      title: (await tRegister)("title"),
      description: (await tRegister)("description"),
      siteName: (await tGeneral)("omidshabab"),
    },
  }
}

export default async function layout({
  children
}: {
  children: React.ReactNode
}) {
  const { session } = await getUserAuth();
  if (session) redirect("/");

  return (
    <div className="w-full h-full flex justify-center items-center">
      {children}
    </div>
  )
}