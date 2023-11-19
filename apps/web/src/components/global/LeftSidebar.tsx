"use client";

import dynamicIconImports from "lucide-react/dynamicIconImports";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@huddl/utils";

import {
  KindeUser
} from "@kinde-oss/kinde-auth-nextjs/server";
import { trpc } from "@web/app/_trpc/client";
import { buttonVariants } from "../ui/button";
import Icon from "../ui/icon";
import UserAccountNav from "./UserAccountNav";

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
    icon: "layout-dashboard",
  },
];

const problemSidebarItems: {
  title: string;
  href: string;
  icon: keyof typeof dynamicIconImports;
}[] = [
  {
    title: "Problems",
    href: "/problems",
    icon: "target",
  },
  {
    title: "Contests",
    href: "/contests",
    icon: "trophy",
  },
];

const friendsSidebarItems: {
  title: string;
  href: string;
  icon: keyof typeof dynamicIconImports;
}[] = [
  {
    title: "Chat",
    href: "/chat",
    icon: "message-square",
  },
  {
    title: "Explore",
    href: "/explore",
    icon: "search",
  },
  {
    title: "Requests",
    href: "/requests",
    icon: "user-plus",
  },
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  user: KindeUser;
}

export function LeftSidebar({ className, user }: SidebarProps) {
  const pathname = usePathname();

  const {data} = trpc.userDetails.getUsername.useQuery();

  let username = data?.username;
  
  return (
    <div className={cn("pb-12 flex flex-col justify-between h-screen", className)}>
      <div className="space-y-4 py-4">
      <Link href="/" className="flex z-40 font-semibold px-4">
                        <span className="text-xl px-3">huddl.</span>
                    </Link>
        <div className="px-3 py-2">
        <h2 className="mb-1 px-4 text-xs text-gray-400 font-semibold tracking-tight leading-6 mt-4">
            OVERVIEW
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
                    `w-full justify-start ${pathname === item.href ? "opacity-80" : "opacity-70"}`,
                  )}
                >
                  <Icon name={item.icon} className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </div>
          <h2 className="mb-1 px-4 text-xs text-gray-400 font-semibold tracking-tight leading-6 mt-6">
            CODING
          </h2>
          <div className="flex flex-col gap-1 space-y-1">
            {problemSidebarItems.map((item, index) => {
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
                    `w-full justify-start ${pathname === item.href ? "opacity-80" : "opacity-70"}`,
                  )}
                >
                  <Icon name={item.icon} className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </div>
          <h2 className="mb-1 px-4 text-xs text-gray-400 font-semibold tracking-tight leading-6 mt-6">
            FRIENDS
          </h2>
          <div className="flex flex-col gap-1 space-y-1">
            {friendsSidebarItems.map((item, index) => {
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
                    `w-full justify-start ${pathname === item.href ? "opacity-80" : "opacity-70"}`,
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
      <div className="mx-3 ml-5">
          <UserAccountNav
            name={
                !user.given_name || !user.family_name
                    ? "Your Account"
                    : `${user.given_name} ${user.family_name}`
            }
            username={username?.toString() ?? ""}
            imageUrl={user.picture ?? ""}
          />
          </div>
    </div>
  );
}
