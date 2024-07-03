import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

// Dynamic Metadata based on locales
export async function generateMetadata(): Promise<Metadata> {
     const tGeneral = getTranslations("general")
     const tMetadata = getTranslations("home_metadata")

     return {
          title: {
               default: (await tMetadata)("title"),
               template: `%s${(await tGeneral)("separator")} ${(await tMetadata)("title")}`,
          },
          description: (await tMetadata)("desc"),
     }
}

export default function layout({
     children
}: {
     children: React.ReactNode,
}) {
     return children
}