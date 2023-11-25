import { z } from "zod";

export const newProblemReq = z.object({
    title: z.string(),
    difficulty: z.enum(["easy", "medium", "hard"]),
});

export type NewProblemReq= z.infer<typeof newProblemReq>;

export const updateProblemReq = z.object({
    problemSlug: z.string(),
    problemStatement: z.string(),
    starterCode: z.string(),
    examples: z.string(),
    testCases: z.string(),
});

export const updateProblemMetaReq = z.object({
    problemSlug: z.string(),
    title: z.string(),
    difficulty: z.enum(["easy", "medium", "hard"]),
    isProblemPublic: z.boolean(), 
});