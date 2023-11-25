
import { newProblemReq, updateProblemReq } from "@admin/utils/types/problem-editor";
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
    .mutation(async ({ ctx, input }) => {
        const { userId } = ctx;
        const { problemSlug, problemStatement } = input;

        const problem = await db.problem.update({
            where: {
                slug: problemSlug,
            },
            data: {
                problemStatement,
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
});
