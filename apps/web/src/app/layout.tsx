import "./globals.css";

import Providers from "@web/components/global/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cn } from "@huddl/utils";
import { Toaster } from "@web/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Huddl",
  description: "huddl.one",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <Providers>
        <body
          className={cn(
            "grainy min-h-screen font-sans antialiased",
            inter.className,
          )}
        >
          {children}
        <Toaster />
        </body>
      </Providers>
    </html>
  );
}
