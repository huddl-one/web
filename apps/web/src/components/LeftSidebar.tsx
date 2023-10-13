"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessagesSquare, Plus } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

import { cn } from "@huddl/utils";

import { Button, buttonVariants } from "./ui/button";
import Icon from "./ui/icon";
import { ScrollArea } from "./ui/scroll-area";

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
    title: "Friends",
    href: "/friends",
    icon: "users-2",
  },
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  channels: Channel[];
}

export function LeftSidebar({ className, channels }: SidebarProps) {
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
        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Channels
          </h2>
          <ScrollArea className="max-h-[300px] px-1">
            <div className="space-y-1 p-2">
              {channels?.map((channel, i) => (
                <Link href={`/chat/${channel.id}`} key={`${channel.id}-${i}`}>
                  <Button
                    variant="ghost"
                    className={cn(
                      buttonVariants(
                        pathname === `/chat/${channel.id}`
                          ? { variant: "outline" }
                          : { variant: "ghost" },
                      ),
                      "w-full justify-start font-normal",
                    )}
                  >
                    <MessagesSquare className="mr-2 h-4 w-4" />
                    {channel.name}
                  </Button>
                </Link>
              ))}
              <Button
                variant="ghost"
                className="w-full justify-start font-normal"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Chat
              </Button>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
