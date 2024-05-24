import { capitalize } from '@/lib/utils'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import React from 'react'

// Dynamic Metadata based on locales
export async function generateMetadata(): Promise<Metadata> {
     const tRegister = getTranslations("register")
     const tGeneral = getTranslations("general")

     return {
          title: {
               default: capitalize((await tGeneral)("dashboard")),
               template: `%s - ${(await tGeneral)("name")}`,
          },
          description: (await tRegister)("description"),
     }
}

export default function layout({
     children
}: {
     children: React.ReactNode
}) {
     return children
}
