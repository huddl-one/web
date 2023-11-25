import "./globals.css";

import Navbar from "@admin/components/NavBar";
import Providers from "@admin/components/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@admin/components/ui/toaster";
import { cn } from "@huddl/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin | Huddl",
  description: "admin.huddl.one",
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
          <Navbar />
          {children}
        </body>
        <Toaster />
      </Providers>
    </html>
  );
}
