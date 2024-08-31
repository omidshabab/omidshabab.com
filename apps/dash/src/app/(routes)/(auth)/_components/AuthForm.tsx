import { RedoIcon, UndoIcon } from "lucide-react"
import { Form, FormField } from "@repo/ui/components/form"
import { Input } from "@repo/ui/components/input"
import { cn } from "@repo/ui/lib/utils"
import { englishBricolageGrotesqueFont } from "@/lib/fonts"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { FieldValues, useForm } from "react-hook-form"
import { emailFormSchema, passwordFormSchema } from "@/lib/validations/auth"
import React, { useState } from "react"
import { AuthFormEmailSchema, AuthFormPasswordSchema, AuthFormSchema } from "@/types"
import GoogleButton from "./GoogleButton"
import IconButton from "@/components/buttons/icon-button"
import GithubButton from "./GithubButton"
import TextButton from "@/components/buttons/text-button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { signIn } from "next-auth/react"

type AuthStep = "email" | "password" | "confirm"

const AuthForm = () => {
     const tRegister = useTranslations("register_page")

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
          setEmail(values.email)
          setAuthStep("password")
     }

     async function onPasswordSubmit(values: AuthFormPasswordSchema) {
          setIsLoading(true);
          setErrors(null);

          const response = await fetch(action, {
               method: "POST",
               body: JSON.stringify({
                    email, password: values.password
               }),
               redirect: "manual"
          })

          setErrors(await response.json());
          setIsLoading(false);

          if (response.status === 200) {
               router.refresh()
          }
     }

     function googleRegister() {
          setIsLoading(true);

          toast.promise(signIn("google", {
               redirect: false,
          }).then((_) => {
               setIsLoading(false);
          }), {
               loading: `${tRegister("in_progress")}`,
          })
     }

     function githubRegister() {
          setIsLoading(true);

          toast.promise(signIn("github", {
               redirect: false,
          }).then((_) => {
               setIsLoading(false);
          }), {
               loading: `${tRegister("in_progress")}`,
          })
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
                              {tRegister("desc")}
                         </div>
                         <Form {...authEmailForm}>
                              <form
                                   onSubmit={authEmailForm.handleSubmit(onEmailSubmit)}
                                   className="flex flex-col gap-y-10">
                                   <FormField
                                        control={authEmailForm.control}
                                        name="email"
                                        render={({ field }: { field: FieldValues }) => (
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
                                        className="relative flex gap-x-[15px] sm:gap-x-[20px]">
                                        <TextButton
                                             onClick={() => { }}
                                             disabled={isLoading}
                                             type="default">
                                             {tRegister("go_to_next_button")}
                                        </TextButton>
                                   </div>
                              </form>
                         </Form>
                    </div>
               }

               {authStep === "password" &&
                    <div className="flex flex-col gap-y-10">
                         <div className="text-[25px] sm:text-[30px] text-slate-800 font-bold leading-[3rem] sm:leading-[3.5rem] cursor-text">
                              {tRegister("password_desc")}
                         </div>
                         <Form {...authPasswordForm} formState={authPasswordForm.formState}>
                              <form
                                   onSubmit={authPasswordForm.handleSubmit(onPasswordSubmit)}
                                   className="flex flex-col gap-y-10">
                                   <FormField
                                        control={authPasswordForm.control}
                                        name="password"
                                        render={({ field }: { field: FieldValues }) => (
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
                                        className="relative flex gap-x-[15px] sm:gap-x-[20px]">
                                        <IconButton
                                             onClick={() => {
                                                  authPasswordForm.reset()
                                                  setAuthStep("email")
                                             }}
                                             animateOnHover
                                             disabled={isLoading}
                                             className="flex w-min text-[20px] font-bold transform hover:-translate-y-1 transition duration-400"
                                        >
                                             <UndoIcon className="hidden ltr:block size-[22px] sm:size-[30px] text-orange-600" />

                                             <RedoIcon className="hidden rtl:block size-[22px] sm:size-[30px] text-orange-600" />
                                        </IconButton>

                                        <TextButton
                                             onClick={() => { }}
                                             disabled={isLoading}
                                             type="default">
                                             {tRegister("login_button")}
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