
import { newProblemReq, updateProblemMetaReq, updateProblemReq } from "@admin/utils/types/problem-editor";
import { db } from "@huddl/db";
import { slugify } from "@huddl/utils";
import { adminProcedure, router } from "../trpc";

export const problemRouter = router({
    newProblem: adminProcedure
    .input(newProblemReq)
    .mutation(async ({ ctx, input }) => {
        const { userId } = ctx;
        const { title, difficulty } = input;
        const slug = slugify(title);

        const problem = await db.problem.create({
            data: {
                title,
                slug,
                difficulty,
            },
        });

        if (!problem) {
            throw new Error("Problem creation failed");
        }

        return {
            success: true,
            redirect: `/problems/${problem.slug}`,
        };
    }),
    updateProblem: adminProcedure
    .input(updateProblemReq)
    .mutation(async ({ input }) => {
        const { problemSlug, problemStatement, starterCode, examples, testCases } = input;

        const problem = await db.problem.update({
            where: {
                slug: problemSlug,
            },
            data: {
                problemStatement,
                starterCode,
                exampleTestCases: examples,
                testCases,
            },
        });

        if (!problem) {
            throw new Error("Problem update failed");
        }

        return {
            success: true,
            redirect: `/problems/${problem.slug}`,
        };
    }
    ),
    updateProblemMeta: adminProcedure
    .input(updateProblemMetaReq)
    .mutation(async ({ input }) => {
        const { problemSlug, title, difficulty, isProblemPublic } = input;

        const problem = await db.problem.update({
            where: {
                slug: problemSlug,
            },
            data: {
                title,
                difficulty,
                published: isProblemPublic,
            },
        });

        if (!problem) {
            throw new Error("Problem meta update failed");
        }

        return {
            success: true,
            redirect: `/problems/${problem.slug}`,
        };
    }),
});
