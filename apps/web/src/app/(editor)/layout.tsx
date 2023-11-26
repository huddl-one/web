import { db } from "@huddl/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import TopBar from "@web/components/prblmpage/TopBar";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

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
        <main className="">
            <TopBar email={user.email!} name={user.given_name + " " + user.family_name} imageUrl={user.picture!}  />
            {children}
        </main>
    );
}
