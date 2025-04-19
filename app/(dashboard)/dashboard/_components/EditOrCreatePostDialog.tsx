"use client";

import { Button } from "@/app/_components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { HiOutlineUpload } from "react-icons/hi";

import { IoClose } from "react-icons/io5";
import { Textarea } from "@/app/_components/ui/textarea";
import { BsRobot } from "react-icons/bs";
import FileUploadComponent from "./FileUploadComponent";
import SheduleComponent from "./SheduleComponent";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "../../_components/Checkbox";
import toast from "react-hot-toast";
import { useState } from "react";
import { LoadingSpinner } from "@/app/_components/LoadingSpinner";

type Platform = "instagram" | "facebook" | "x" | "linkedin";

interface IEditOrCreatepostDialogProps {
  title: string;
  caption?: string;
  time?: string;
  date?: string;
  platform?: Platform[];
}

const platforms = [
  {
    id: "facebook",
    label: "Facebook",
  },
  {
    id: "instagram",
    label: "Instagram",
  },
  {
    id: "x",
    label: "X",
  },
  {
    id: "linkedin",
    label: "Linkedin",
  },
] as const;

export const FormSchema = z.object({
  postContent: z
    .string()
    .min(10, "Post content should be atleast 10 characters"),
  media: z.instanceof(File).optional(),
  schedule: z.date().optional(),
  platforms: z
    .array(z.enum(["instagram", "linkedin", "x", "facebook"]))
    .refine((platform) => platform.some((val) => val), {
      message: "Select atleast one platform",
    }),
});

function EditOrCreatePostDialog({ title }: IEditOrCreatepostDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      media: undefined,
      postContent: "",
      schedule: new Date(),
      platforms: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("postContent", data.postContent);
    formData.append("platforms", JSON.stringify(data.platforms));
    formData.append("schedule", data.schedule!.toString());

    if (data.media) formData.append("media", data.media);

    await toast.promise(
      fetch("/api/create-post", {
        method: "POST",

        body: formData,
      }).then(async (response) => {
        const responseData = await response.json();

        if (!response.ok) {
          setIsLoading(false);
          throw new Error(responseData.message || "Failed to create post");
        }

        form.reset();
        setIsLoading(false);
        return responseData;
      }),
      {
        loading: "Posting...",
        success: "Posted created!",
        error: (err) =>
          err.message || "Something went wrong while posting try again.",
      }
    );
  };

  return (
    <DialogContent className="[&>button]:hidden md:max-w-[655px] max-h-[calc(100vh-2rem)] overflow-auto ">
      <DialogHeader className=" flex-row items-center justify-between">
        <div className="flex  items-center gap-2">
          <DialogTitle className="">{title}</DialogTitle>
        </div>
        <DialogClose asChild>
          <Button type="button" size="sm" variant="secondary">
            <IoClose />
          </Button>
        </DialogClose>
      </DialogHeader>
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-4 flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="postContent"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80 font-medium text-sm">
                  Post Content
                </FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Textarea
                      disabled={isLoading}
                      placeholder="Type your message here."
                      className=" min-h-[150px] max-h-[200px] md:max-w-[620px] max-w-[calc(100vw-4rem)]  resize-y text-sm"
                      {...field}
                    />

                    <span className="absolute right-2  bottom-2 text-foreground/50 cursor-pointer hover:text-primary transition-colors duration-300 bg-white p-1 rounded-md">
                      <BsRobot size={22} />
                    </span>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="media"
            render={({ field }) => <FileUploadComponent field={field} />}
          />
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="schedule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-medium text-sm">
                    Schedule
                  </FormLabel>
                  <FormControl>
                    <SheduleComponent field={field} isLoading={isLoading} />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="platforms"
              render={() => (
                <FormItem>
                  <FormLabel className="text-foreground/80 font-medium text-sm">
                    Platforms
                  </FormLabel>
                  <div className="grid grid-cols-2 gap-1">
                    {platforms.map((platform) => (
                      <FormField
                        key={platform.id}
                        control={form.control}
                        name="platforms"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={platform.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  disabled={isLoading}
                                  className="cursor-pointer"
                                  checked={field.value?.includes(platform.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          platform.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== platform.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal cursor-pointer">
                                {platform.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter className="flex items-center justify-end border-none">
            <DialogClose asChild>
              <Button disabled={isLoading} variant="secondary" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isLoading} type="submit" size="icon">
              {isLoading ? <LoadingSpinner /> : <HiOutlineUpload />}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}

export default EditOrCreatePostDialog;
