"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { ChevronDown, HelpCircle, LayoutDashboard, LogOut, Map, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { Icons } from "./Icons";

interface UserAccountNavProps {
    username: string;
    name: string;
    imageUrl: string;
}

const UserAccountNav = ({
    username,
    imageUrl,
    name,
}: UserAccountNavProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="overflow-visible">
                    <div className="flex items-center justify-between">
                    <section className="flex items-center gap-2">
                    <Avatar className="relative w-8 h-8">
                        {imageUrl ? (
                            <div className="relative aspect-square h-full w-full">
                                <Image
                                    fill
                                    src={imageUrl}
                                    alt="profile picture"
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                        ) : (
                            <AvatarFallback>
                                <span className="sr-only">{name}</span>
                                <Icons.user className="h-4 w-4 text-zinc-900" />
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <span>{name}</span>
                    </section>
                    <ChevronDown className="h-4 w-4 ml-1.5" />
                    </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-0.5 leading-none">
                        {name && (
                            <p className="font-medium text-sm text-black">
                                {name}
                            </p>
                        )}
                        {username && (
                            <p className="w-[200px] truncate text-xs text-zinc-700">
                                {"@" + username}
                            </p>
                        )}
                    </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                <div className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    <Link href="/dashboard">Dashboard</Link>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <Link href="/profile">My Profile</Link>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4"/>
                    <Link href="/settings">Settings</Link>
                    </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                <div className="flex items-center gap-2">
                    <Map className="h-4 w-4"/>
                    <Link href="/roadmap">Roadmap</Link>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    <Link href="/support">Support</Link>
                    </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer">
                    <div className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    <LogoutLink>Log out</LogoutLink>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserAccountNav;
