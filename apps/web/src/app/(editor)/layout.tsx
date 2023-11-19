import WidthWrapper from "@web/components/global/WidthWrapper";
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
            <main className="grid grid-cols-10 gap-8">
                {children}
            </main>
        </WidthWrapper>
    );
}
