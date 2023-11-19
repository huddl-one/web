import Problems from "@web/components/problems/Problems";

import { db } from "@huddl/db";
import { Suspense } from "react";

export interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: "easy" | "medium" | "hard";
}

export default async function Home() {

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

  // If everything is fine, we can show the dashboard
  return <Suspense><Problems problems={problemsDB} /></Suspense>;
}
