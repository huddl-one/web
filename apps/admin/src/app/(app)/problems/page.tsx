import Problems from "@admin/components/Problems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@huddl/db";

export interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: "easy" | "medium" | "hard";
  published: boolean;
}


export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  //  Checking whether the user is logged in
  if (!user || !user.id) {
    redirect("/auth-callback?origin=problems");
  }

  //  Checking whether the user is synced to db
  const dbuser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbuser) {
    redirect("/auth-callback?origin=problems");
  }

  //  Fetching all the problems
  const problemsDB = await db.problem.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      difficulty: true,
      published: true,
    },
  });

  // If everything is fine, we can show the dashboard
  return <Problems problems={problemsDB} />;
}
