import { z } from "zod";

export const PostSchema = z.object({
  postContent: z.string(),
  schedule: z.date().optional(),
  media: z.instanceof(File).nullable().optional(),
  platforms: z.array(z.enum(["instagram", "facebook", "linkedin", "x"])),
});
