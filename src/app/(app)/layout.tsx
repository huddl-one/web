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
            <main className="grid grid-cols-5 gap-8">
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
        </WidthWrapper>
    );
}
