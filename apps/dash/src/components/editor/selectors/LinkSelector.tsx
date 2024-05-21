import { cn } from "@repo/ui/lib/utils";
import { useEditor } from "novel";
import { Check, X } from "lucide-react";
import {
     type Dispatch,
     type FC,
     type SetStateAction,
     useEffect,
     useRef,
} from "react";
import { Button } from "@repo/ui/components/ui/button";
import {
     PopoverContent,
     Popover,
     PopoverTrigger,
} from "@repo/ui/components/ui/popover";

export function isValidUrl(url: string) {
     try {
          new URL(url);
          return true;
     } catch (e) {
          return false;
     }
}
export function getUrlFromString(str: string) {
     if (isValidUrl(str)) return str;
     try {
          if (str.includes(".") && !str.includes(" ")) {
               return new URL(`https://${str}`).toString();
          }
     } catch (e) {
          return null;
     }
}
interface LinkSelectorProps {
     open: boolean;
     onOpenChange: (open: boolean) => void;
}

export const LinkSelector = ({ open, onOpenChange }: LinkSelectorProps) => {
     const inputRef = useRef<HTMLInputElement>(null);
     const { editor } = useEditor();

     // Autofocus on input by default
     useEffect(() => {
          inputRef.current && inputRef.current?.focus();
     });
     if (!editor) return null;

     return (
          <Popover modal={true} open={open} onOpenChange={onOpenChange}>
               <PopoverTrigger asChild>
                    <Button
                         size="sm"
                         variant="ghost"
                         className="gap-[15px] border-0 rounded-none">
                         <p
                              className={cn("text-slate-800 text-[15px]", {
                                   "text-text": editor.isActive("link"),
                              })}>
                              Link
                         </p>
                    </Button>
               </PopoverTrigger>
               <PopoverContent align="start" className="w-[200px] p-0 bg-primary/20 backdrop-blur-3xl border-[1px] border-primary/20 rounded-[10px]" sideOffset={10}>
                    <form
                         onSubmit={(e) => {
                              const target = e.currentTarget as HTMLFormElement;
                              e.preventDefault();
                              const input = target[0] as HTMLInputElement;
                              const url = getUrlFromString(input.value);
                              url && editor.chain().focus().setLink({ href: url }).run();
                         }}
                         className="flex items-center">
                         <input
                              ref={inputRef}
                              type="text"
                              placeholder="Paste a link"
                              className="flex-grow bg-transparent placeholder:text-slate-600 min-w-[150px] px-[12px] py-[10px] text-sm outline-none"
                              defaultValue={editor.getAttributes("link").href || ""} />
                         <div className="px-[10px] py-[5px]">
                              {editor.getAttributes("link").href ? (
                                   <Button
                                        size="icon"
                                        variant="ghost"
                                        type="button"
                                        className="flex h-min w-min px-0 py-0 text-text hover:text-text/80"
                                        onClick={() => {
                                             editor.chain().focus().unsetLink().run();
                                        }}>
                                        <X className="w-[18px] h-[18px]" />
                                   </Button>
                              ) : (
                                   <Button
                                        size="icon"
                                        variant="ghost"
                                        className="flex h-min w-min px-0 py-0 text-text hover:bg-transparent">
                                        <Check className="w-[20px] h-[20px]" />
                                   </Button>
                              )}
                         </div>
                    </form>
               </PopoverContent>
          </Popover>
     );
};