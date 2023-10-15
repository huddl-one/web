"use client";

import dynamicIconImports from "lucide-react/dynamicIconImports";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@huddl/utils";

import { buttonVariants } from "./ui/button";
import Icon from "./ui/icon";

export type Channel = {
  name: string;
  id: string;
};

const sidebarItems: {
  title: string;
  href: string;
  icon: keyof typeof dynamicIconImports;
}[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "home",
  },
  {
    title: "Problems",
    href: "/problems",
    icon: "target",
  },
  {
    title: "Users",
    href: "/users",
    icon: "users-2",
  },
  {
    title: "Changelog",
    href: "/changelog",
    icon: "clock",
  }
];


export function LeftSidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname();
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="flex flex-col gap-1 space-y-1">
            {sidebarItems.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    buttonVariants(
                      pathname === item.href
                        ? { variant: "outline" }
                        : { variant: "ghost" },
                    ),
                    "w-full justify-start",
                  )}
                >
                  <Icon name={item.icon} className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
