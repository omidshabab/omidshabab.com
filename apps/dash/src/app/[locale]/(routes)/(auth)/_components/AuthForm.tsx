import { Form, FormField } from "@repo/ui/components/ui/form"
import { Input } from "@repo/ui/components/ui/input"
import { cn } from "@repo/ui/lib/utils"
import { englishBricolageGrotesqueFont } from "@/lib/fonts"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { emailFormSchema, passwordFormSchema } from "@/lib/validations/auth"
import React, { useState } from "react"
import { AuthFormEmailSchema, AuthFormPasswordSchema, AuthFormSchema } from "@/types"
import GoogleButton from "./GoogleButton"
import IconButton from "@/components/buttons/icon-button"
import { Redo } from "lucide-react"
import GithubButton from "./GithubButton"
import TextButton from "@/components/buttons/text-button"
import { useRouter } from "next/navigation"

type AuthStep = "email" | "password" | "confirm"

const AuthForm = () => {
     const tRegister = useTranslations("register")

     const router = useRouter();

     const [isLoading, setIsLoading] = React.useState<boolean>(false)
     const [errors, setErrors] = useState<{ error: string } | null>(null);

     const [email, setEmail] = React.useState<string>("")
     const [password, setPassword] = React.useState<string>("")

     const action = "/api/register";

     const [authStep, setAuthStep] = React.useState<AuthStep>("email")

     const authEmailForm = useForm<AuthFormEmailSchema>({
          resolver: zodResolver(emailFormSchema),
          defaultValues: {
               email: email,
          },
     })

     const authPasswordForm = useForm<AuthFormPasswordSchema>({
          resolver: zodResolver(passwordFormSchema),
          defaultValues: {
               password: password,
          },
     })

     async function onEmailSubmit(values: AuthFormEmailSchema) {
          setAuthStep("password")
     }

     async function onPasswordSubmit(values: AuthFormPasswordSchema) {
          console.log("Done!")
     }

     async function onAuthSubmit(values: AuthFormSchema) {
          console.log(`Email is: ${values.email}`)
          console.log(`Password is: ${values.password}`)

          // values.preventDefault();

          // setIsLoading(true);
          // setErrors(null);
          // const formData = new FormData(values.currentTarget)
          // const response = await fetch("/api/register", {
          //      method: "POST",
          //      body: formData,
          //      redirect: "manual"
          // })

          // if (response.status === 0) {
          //      return router.refresh();
          // }

          // setErrors(await response.json());
          // setIsLoading(false);
     }

     function googleRegister() {
          setIsLoading(true);
     }

     function githubRegister() {
          setIsLoading(true)
     }

     return (
          <>
               {authStep === "email" &&
                    <div className="flex flex-col gap-y-10">
                         <div className="flex gap-3 sm:gap-5">
                              <GoogleButton
                                   onClick={googleRegister}
                                   disabled={isLoading}>
                                   {tRegister("google")}
                              </GoogleButton>

                              <GithubButton
                                   onClick={githubRegister}
                                   disabled={isLoading} />
                         </div>
                         <div className="text-[25px] sm:text-[30px] text-slate-800 font-bold leading-[3rem] sm:leading-[3.5rem] cursor-text">
                              {tRegister("description")}
                         </div>
                         <Form {...authEmailForm}>
                              <form
                                   onSubmit={authEmailForm.handleSubmit(onEmailSubmit)}
                                   className="flex flex-col gap-y-10">
                                   <FormField
                                        control={authEmailForm.control}
                                        name="email"
                                        render={({ field }) => (
                                             <Input
                                                  id="email"
                                                  dir="ltr"
                                                  placeholder="hey@omidshabab.com"
                                                  type="email"
                                                  autoCapitalize="none"
                                                  autoComplete="off"
                                                  autoCorrect="off"
                                                  autoFocus
                                                  aria-autocomplete="none"
                                                  disabled={isLoading}
                                                  className={cn(
                                                       "text-[25px] sm:text-[30px] caret-primary border-b text-slate-800 border-black/5 focus:border-black/10 transition-opacity duration-500 text-center py-3",
                                                       englishBricolageGrotesqueFont.className,
                                                  )}
                                                  {...field} />
                                        )}
                                   />
                                   <div
                                        className="relative flex gap-5">
                                        <TextButton
                                             onClick={() => { }}
                                             disabled={isLoading}
                                             type="default">
                                             {tRegister("submit_email")}
                                        </TextButton>
                                   </div>
                              </form>
                         </Form>
                    </div>
               }
               {authStep === "password" &&
                    <div className="flex flex-col gap-y-10">
                         <div className="text-[25px] sm:text-[30px] text-slate-800 font-bold leading-[3rem] sm:leading-[3.5rem] cursor-text">
                              {tRegister("description")}
                         </div>
                         <Form {...authPasswordForm} formState={authPasswordForm.formState}>
                              <form
                                   onSubmit={authPasswordForm.handleSubmit(onPasswordSubmit)}
                                   className="flex flex-col gap-y-10">
                                   <FormField
                                        control={authPasswordForm.control}
                                        name="password"
                                        render={({ field }) => (
                                             <Input
                                                  id="password"
                                                  dir="ltr"
                                                  placeholder="********"
                                                  type="password"
                                                  autoCapitalize="none"
                                                  autoComplete="off"
                                                  autoCorrect="off"
                                                  autoSave="off"
                                                  autoFocus
                                                  aria-autocomplete="none"
                                                  disabled={isLoading}
                                                  className={cn(
                                                       "text-[25px] sm:text-[30px] caret-primary border-b text-slate-800 border-black/5 focus:border-black/10 transition-opacity duration-500 text-center py-3",
                                                       englishBricolageGrotesqueFont.className,
                                                  )}
                                                  {...field} />
                                        )}
                                   />
                                   <div
                                        className="relative flex gap-5">
                                        <IconButton
                                             onClick={() => {
                                                  authPasswordForm.reset()
                                                  setAuthStep("email")
                                             }}
                                             disabled={isLoading}
                                             className="flex w-min text-[20px] font-bold py-[30px] px-[25px] rounded-[12px] transform hover:-translate-y-1 transition duration-400"
                                        >
                                             <Redo size={30} className="text-orange-600" />
                                        </IconButton>

                                        <TextButton
                                             onClick={() => { }}
                                             disabled={isLoading}
                                             type="default">
                                             {tRegister("submit_email")}
                                        </TextButton>
                                   </div>
                              </form>
                         </Form>
                    </div>
               }
          </>
     );

}

export default AuthForm;