import { z } from "zod";

export const runCode = z.object({
    language: z.string(),
    code: z.string(),
    slug: z.string(),
  })