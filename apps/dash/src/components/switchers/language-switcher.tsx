"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
     Popover,
     PopoverContent,
     PopoverTrigger
} from "@repo/ui/components/ui/popover";
import {
     Command,
     CommandGroup,
     CommandInput,
     CommandItem
} from "@repo/ui/components/ui/command";
import { Button } from "@repo/ui/components/ui/button";

import { Check, ChevronDown } from "lucide-react";
import { Spacer } from "@nextui-org/spacer";
import { useTranslations } from "next-intl";
import { cn } from "@repo/ui/lib/utils";
import { languages } from "@/lib/langs";

const LanguageSwitcher = ({
     locale,
}: {
     locale: string
}) => {
     const [open, setOpen] = useState(false);
     const [value, setValue] = useState("english");

     const router = useRouter();

     const tGeneral = useTranslations("general")
     const tLanguages = useTranslations("languages")

     useEffect(() => {
          languages.find((lang) => lang.value === locale && setValue(lang.label))
     }, [locale, value])

     return (
          <Popover open={open} onOpenChange={setOpen}>
               <PopoverTrigger asChild>
                    <Button
                         variant="outline"
                         className="w-[120px] justify-between">
                         {tLanguages(value)}
                         <ChevronDown className="px-0 h-4 w-4 opacity-50" />
                    </Button>
               </PopoverTrigger>
               <PopoverContent className="w-[120px] p-0">
                    <Command>
                         <CommandInput
                              placeholder={tGeneral("language")}
                              className="capitalize" />
                         <CommandGroup>
                              {languages.map((lang) => (
                                   <CommandItem
                                        key={lang.label}
                                        className="cursor-pointer"
                                        onSelect={() => {
                                             router.push("/" + lang.value)
                                             setOpen(false)
                                        }}>
                                        <Check
                                             className={cn(
                                                  "h-4 w-4",
                                                  value === lang.label ? "opacity-100" : "opacity-0"
                                             )}
                                        />
                                        <Spacer x={2} />
                                        {tLanguages(lang.label)}
                                   </CommandItem>
                              ))}
                         </CommandGroup>
                    </Command>
               </PopoverContent>
          </Popover>
     );
}

export default LanguageSwitcher;