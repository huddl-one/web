import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { RightSidebar } from "@web/components/global/RightSidebar";
import WidthWrapper from "@web/components/global/WidthWrapper";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { db } from "@huddl/db";
import { LeftSidebar } from "@web/components/global/LeftSidebar";

export const metadata: Metadata = {
    title: "Huddl",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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

    return (
        <WidthWrapper>
            <main className="hidden 2xl:grid grid-cols-5 gap-8 relative">
                <LeftSidebar
                    user={user}
                    className="fixed w-[14%]"
                />
                <div className="col-start-2 col-span-3">
                {children}
                </div>
                <RightSidebar />
            </main>
            <main className="grid grid-cols-5 lg:grid-cols-4 gap-8 2xl:hidden relative">
                <section className="col-span-2 lg:col-span-1">
                    <LeftSidebar
                        className="fixed w-1/5"
                        user={user}
                    />
                </section>
                <div className="col-start-2 col-span-4">
                {children}
                </div>
            </main>
        </WidthWrapper>
    );
}
