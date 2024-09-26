import { createImageUpload } from "novel/plugins";
import { toast } from "sonner";

export const onUpload = (file: File) => {
     const promise = fetch("/api/upload", {
          method: "POST",
          headers: {
               "content-type": file?.type || "application/octet-stream",
               "x-vercel-filename": file?.name || "image.png",
          },
          body: file,
     });

     return new Promise((resolve) => {
          toast.promise(
               promise.then(async (res) => {
                    if (res.status === 200) {
                         const { url } = (await res.json()) as any;
                         let image = new Image();
                         image.src = url;
                         image.onload = () => {
                              resolve(url);
                         };

                         console.log(`this upload api result: ${JSON.stringify(url)}`)
                    } else if (res.status === 401) {
                         resolve(file);
                         throw new Error(
                              "`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead.",
                         );
                    } else {
                         throw new Error(`Error uploading image. Please try again.`);
                    }
               }),
               {
                    loading: "Uploading image...",
                    success: "Image uploaded successfully.",
                    error: (e) => e.message,
               },
          );
     });
};

export const uploadFn = createImageUpload({
     onUpload,
     validateFn: (file) => {
          if (!file.type.includes("image/")) {
               toast.error("File type not supported.");
               return false;
          } else if (file.size / 1024 / 1024 > 20) {
               toast.error("File size too big (max 20MB).");
               return false;
          }
          return true;
     },
});