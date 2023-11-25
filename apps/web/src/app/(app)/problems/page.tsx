import Problems from "@web/components/problems/Problems";

import { db } from "@huddl/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redis } from "@web/lib/redis";
import { Suspense } from "react";

export interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: "easy" | "medium" | "hard";
  solved: boolean;
}

export default async function Home() {

  const { getUser } = getKindeServerSession();
  const user = getUser();

  const problemsDB = await db.problem.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      difficulty: true,
    },
    where: {
      published: true,
    }
  });

  let problemsRedis = await redis.LRANGE(`user:${user.id}:problems`, 0, -1);

  if (problemsRedis.length === 0 || !problemsRedis) {
    const solvedProblems = await db.userProblem.findMany({
      where: {
        userId: user.id!,
      },
      select: {
        problemId: true,
      }
    });

    if (solvedProblems.length !== 0) {
      await redis.LPUSH(`user:${user.id}:problems`, solvedProblems.map((problem) => problem.problemId));

      problemsRedis = solvedProblems.map((problem) => problem.problemId);
    }
  }

  let problems: Problem[] = [];

  // Mark problems as solved
  problemsDB.forEach((problem) => {
    let prblm: Problem = {...problem, solved: false};
    const solved = problemsRedis.find((solvedProblem) => solvedProblem === problem.id);
    if (solved) {
      prblm.solved = true;
    }
    problems.push(prblm);
  });

  // If everything is fine, we can show the dashboard
  return <Suspense><Problems problems={problems} /></Suspense>;
}
