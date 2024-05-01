import { ReactNode } from 'react'

export default function layout({
     children
}: {
     children: ReactNode
}) {
     return (
          <div className="w-full min-h-screen bg-grid-black/[0.1] flex relative">
               <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
               <div className="mx-auto max-w-6xl h-full py-[30px] px-[30px] sm:py-[80px] sm:px-0 z-20">
                    {children}
               </div>
          </div>
     )
}
