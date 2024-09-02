import { Form, FormField } from "@repo/ui/components/form"
import { Input } from "@repo/ui/components/input"
import { cn } from "@repo/ui/lib/utils"
import { englishBricolageGrotesqueFont } from "@/lib/fonts"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { FieldValues, useForm } from "react-hook-form"
import { registerSchema } from "@/lib/validations/auth"
import React from "react"
import { AuthFormSchema } from "@/types"
import GoogleButton from "./GoogleButton"
import GithubButton from "./GithubButton"
import TextButton from "@/components/buttons/text-button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { signIn } from "next-auth/react"

const AuthForm = () => {
     const tRegister = useTranslations("register_page")

     const [isLoading, setIsLoading] = React.useState<boolean>(false)

     const [email, setEmail] = React.useState<string>("")

     const form = useForm<AuthFormSchema>({
          resolver: zodResolver(registerSchema),
          defaultValues: {
               email,
          },
     })

     async function onSubmit(values: AuthFormSchema) {
          setIsLoading(true);

          toast.loading(`${tRegister("in_progress")}`,)

          const signInResult = await signIn("email", {
               email: values.email,
               redirect: false,
          })

          setIsLoading(false)

          toast.dismiss()

          if (!signInResult?.ok || signInResult?.error) {
               return toast.error(tRegister("error"), { duration: Infinity, closeButton: true })
          }

          return toast.success(tRegister("success"), { duration: Infinity, closeButton: true })
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

     function onError(values: AuthFormSchema) {
          return toast.error(`${values}`)
     }

     return (
          <div className="flex flex-col gap-y-10 py-[50px]">
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
               <Form {...form}>
                    <form
                         onSubmit={form.handleSubmit(onSubmit)}
                         onError={form.handleSubmit(onError)}
                         className="flex flex-col gap-y-10">
                         <FormField
                              control={form.control}
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
                                   {tRegister("submit_email")}
                              </TextButton>
                         </div>
                    </form>
               </Form>
          </div>
     );

}

export default AuthForm;