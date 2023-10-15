import Users from "@admin/components/Users";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@huddl/db";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  //  Checking whether the user is logged in
  if (!user || !user.id) {
    redirect("/auth-callback?origin=users");
  }

  //  Checking whether the user is synced to db
  const dbuser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbuser) {
    redirect("/auth-callback?origin=users");
  }

  // get all users
  const users = await db.user.findMany();

  // If everything is fine, we can show the dashboard
  return <Users users={users} />;
}
