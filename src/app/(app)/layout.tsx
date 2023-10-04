import { LeftSidebar } from "@web/components/LeftSidebar";
import { RightSidebar } from "@web/components/RightSidebar";
import WidthWrapper from "@web/components/WidthWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Huddl",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <WidthWrapper>
            <main className="hidden 2xl:grid grid-cols-5 gap-8">
                <LeftSidebar
                    channels={[
                        {
                            name: "General",
                            id: "general",
                        },
                    ]}
                />
                {children}
                <RightSidebar />
            </main>
            <main className="grid grid-cols-5 lg:grid-cols-4 gap-8 2xl:hidden">
                <section className="col-span-2 lg:col-span-1">
                    <LeftSidebar
                        channels={[
                            {
                                name: "General",
                                id: "general",
                            },
                        ]}
                    />
                    <RightSidebar />
                </section>
                {children}
            </main>
        </WidthWrapper>
    );
}
