import { LeftSidebar } from "@admin/components/LeftSidebar";
import WidthWrapper from "@admin/components/WidthWrapper";
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
            <main className="grid grid-cols-5 gap-8 mb-20">
                <section className="col-span-2 lg:col-span-1">
                    <LeftSidebar
                    />
                </section>
                {children}
            </main>
        </WidthWrapper>
    );
}
