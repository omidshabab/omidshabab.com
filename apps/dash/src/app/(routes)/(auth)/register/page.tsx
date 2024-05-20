"use client"

import { useSearchParams } from "next/navigation"
import AuthForm from "../_components/AuthForm"
import { RegisterStatus } from "@/types"
import AuthStatus from "../_components/AuthStatus"

export default function Page() {
  const searchParams = useSearchParams()
  const registerStatus = searchParams.get("status") as RegisterStatus

  return (
    <div className="w-full max-w-[600px] px-10 sm:px-0 z-20">
      {registerStatus === "error" && (
        <AuthStatus status="error" />
      )}
      {registerStatus === "success" && (
        <AuthStatus status="success" />
      )}
      {!registerStatus && (
        <AuthForm />
      )}
    </div>
  )
}
