"use client"

import React from "react";

export default function layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main
      onContextMenu={(e) => e.preventDefault()}
      className="w-full h-screen bg-grid-black/[0.1] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="w-full h-full z-20">
        {children}
      </div>
    </main>
  )
}
