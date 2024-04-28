import { ReactNode } from 'react'

export default function layout({
     children
}: {
     children: ReactNode
}) {
     return (
          <div className="w-full min-h-screen bg-grid-black/[0.1] relative flex items-center justify-center">
               <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-orange-50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
               <div className="z-20">
                    {children}
               </div>
          </div>
     )
}
