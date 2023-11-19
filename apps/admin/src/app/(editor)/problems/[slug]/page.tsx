import ProblemStatementEditor from "@admin/components/ProblemStatementEditor";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";


import { Badge } from "@admin/components/ui/badge";
import { db } from "@huddl/db";


const colors: {
  [key: string]: "slate"| "gray"| "zinc"| "neutral"| "stone"| "red"| "orange"| "amber"| "yellow"| "lime"| "green"| "emerald"| "teal"| "cyan"| "sky"| "blue"| "indigo"| "violet"| "purple"| "fuchsia"| "pink"| "rose";
} = {
  "easy": "emerald",
  "medium": "amber",
  "hard": "rose",
};

export default async function Page({ params }: { params: { slug: string } }) {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  //  Checking whether the user is logged in
  if (!user || !user.id) {
    redirect("/auth-callback?origin=friends");
  }

  //  Checking whether the user is synced to db
  const dbuser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbuser) {
    redirect("/auth-callback?origin=friends");
  }

  const problem = await db.problem.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!problem) {
    redirect("/problems");
  }

  // If everything is fine, we can show the dashboard
  return (
    <div className="col-span-5">
  <section className="space-y-1">
  <h1 className="my-8 text-3xl font-bold tracking-tight">
  {problem.title}
  </h1>
  <div className="flex items-center space-x-2">
  <Badge className={`bg-${colors[problem.difficulty]}-100 text-${colors[problem.difficulty]}-500 hover:bg-${colors[problem.difficulty]}-100`}>
  {problem.difficulty}
  </Badge>

  <Badge className={`bg-${problem.published ? "green" : "gray"}-100 text-${problem.published ? "green" : "gray"}-500 hover:bg-${problem.published ? "green" : "gray"}-100`}>
  {problem.published ? "Published" : "Draft"}
  </Badge>
  </div>
  </section>
  <ProblemStatementEditor slug={params.slug} problemTitle={problem.title} problemDiff={problem.difficulty} isPublic={problem.published} />
</div>
  );
}