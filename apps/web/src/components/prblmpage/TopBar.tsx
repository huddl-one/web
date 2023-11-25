import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { ChevronLeft, ChevronRight, LayoutDashboard, List, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "../global/Icons";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Timer from "./Timer";

const TopBar = ({ email,imageUrl,name,}: {email:string, imageUrl: string, name: string}) => {

    return (
        <nav className="fixed h-14 inset-x-0 top-0 z-30 w-full border-b bg-white/75 dark:bg-background backdrop-blur-lg transition-all">
                <div className="flex h-14 items-center justify-between border-b px-8">
                    <Link href="/" className="flex z-40 font-semibold">
                        <span className="text-xl">huddl.</span>
                    </Link>
                    <div className='flex items-center gap-4 flex-1 justify-center'>
						<div
							className='flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 p-2 cursor-pointer '
							// onClick={() => handleProblemChange(false)}
						>
							<ChevronLeft className="h-4 w-4" />
						</div>
						<Link
							href='/problems'
							className='flex items-center gap-2 font-medium max-w-[170px] cursor-pointer bg-gray-100 p-2 rounded-lg hover:bg-gray-200'
						>
							<List className="h-4 w-4" />
							<p className="text-sm">Problem List</p>
						</Link>
						<div
							className='flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 p-2  cursor-pointer '
							// onClick={() => handleProblemChange(true)}
						>
							<ChevronRight className="h-4 w-4" />
						</div>
					</div>
                    <div className="flex items-center space-x-4">
                        {/* <ModeToggle /> */}
                        <Timer />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="overflow-visible">
                                <Button className="rounded-full h-8 w-8 aspect-square bg-slate-400">
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
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="bg-white" align="end">
                                <div className="flex items-center justify-start gap-2 p-2">
                                    <div className="flex flex-col space-y-0.5 leading-none">
                                        {name && (
                                            <p className="font-medium text-sm text-black">
                                                {name}
                                            </p>
                                        )}
                                        {email && (
                                            <p className="w-[200px] truncate text-xs text-zinc-700">
                                                {email}
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

                                {/* <DropdownMenuItem asChild>
                                    {subscriptionPlan?.isSubscribed ? (
                                        <Link href="/dashboard/billing">
                                            Manage Subscription
                                        </Link>
                                    ) : (
                                        <Link href="/pricing">
                                            Upgrade{" "}
                                            <Gem className="text-blue-600 h-4 w-4 ml-1.5" />
                                        </Link>
                                    )}
                                </DropdownMenuItem> */}

                                <DropdownMenuSeparator />

                                <DropdownMenuItem className="cursor-pointer">
                                    <div className="flex items-center gap-2">
                                    <LogOut className="h-4 w-4" />
                                    <LogoutLink>Log out</LogoutLink>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
        </nav>
    );
};

export default TopBar;
