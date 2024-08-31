"use client"

import { useSearchParams } from "next/navigation"
import AuthForm from "../_components/AuthForm"
import { RegisterStatus } from "@/types"
import { useEffect, useRef } from "react"
import { toast } from "sonner"

export default function Page() {
  const searchParams = useSearchParams()
  const registerStatus = searchParams.get("status") as RegisterStatus
  const error = searchParams.get("error")

  const toastShownRef = useRef(false);

  useEffect(() => {
    if (error && !toastShownRef.current) {
      toast.error(`${error} error`, { duration: Infinity, closeButton: true });
      toastShownRef.current = true;
    }
  }, [error]);

  return (
    <div className="w-full max-w-[600px] px-10 sm:px-0 z-20">
      <AuthForm />
    </div>
  )
}
