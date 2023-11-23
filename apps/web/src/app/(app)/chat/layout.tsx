import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getChatsByUserId } from "@web/lib/helpers/get-chats-by-userid";
import type { Metadata } from "next";
import ChatSidebar from "./_components/ChatSidebar";


export const metadata: Metadata = {
    title: "Messages | Huddl",
};



export default async function ChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const { getUser } = getKindeServerSession();
    const user = getUser();

    const chats = await getChatsByUserId(user.id!)

    return (
        <div>
            <h1 className="my-8 text-2xl font-semibold tracking-tight">
                Messages
            </h1>
            <section className="grid grid-cols-4 w-full gap-4 mt-8">
            <ChatSidebar chats={chats} />
                <div className="col-span-3">
                {children}
                </div>
                </section>
            </div>
    );
}
