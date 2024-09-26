import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { ReactNode } from "react"

export async function generateMetadata(): Promise<Metadata> {
     const tGeneral = getTranslations("general")
     const tMetadata = getTranslations("profile_metadata")

     return {
          title: {
               default: (await tMetadata)("title"),
               template: `%s${(await tGeneral)("separator")} ${(await tMetadata)("title")}`,
          },
          description: (await tMetadata)("description"),
     }
}

export default function layout({
     children
}: {
     children: ReactNode
}) {
     return children
}