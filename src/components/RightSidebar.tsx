import { cn } from "@web/lib/utils";
import {
    ArrowRight,
    BrainCircuit,
    Medal,
    PencilLine,
    PlusCircleIcon,
    Trophy,
    Workflow,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RightSidebar({ className }: SidebarProps) {
    return (
        <div className={cn("pb-12", className)}>
            <div className="space-y-4 py-6">
                <Card className="border border-primary">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="font-semibold tracking-tight">
                            Start a Contest
                        </CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="pb-4">
                        <p className="text-xs text-muted-foreground">
                            Practice by yourself or Join a contest with your
                            friends!!
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button className="px-3 py-2 flex items-center w-full">
                            <PlusCircleIcon className="mr-2 h-4 w-4" />
                            <h2 className="px-4 font-semibold tracking-tight">
                                Create Contest
                            </h2>
                        </Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="font-semibold tracking-tight">
                            Weekly Contest
                        </CardTitle>
                        <Medal className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="pb-4">
                        <p className="text-xs text-muted-foreground">
                            Compete with 1000+ users worldwide and win exciting
                            prizes!!
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="px-3 py-2 flex items-center w-full"
                            variant={"outline"}
                        >
                            <h2 className="px-4 font-semibold tracking-tight">
                                Register
                            </h2>
                        </Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="font-semibold tracking-tight">
                            Chatbot Assistant
                        </CardTitle>
                        <BrainCircuit className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="pb-4">
                        <p className="text-xs text-muted-foreground">
                            A revoultionary AI assistant to help you with your
                            coding problems!!
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="px-3 py-2 flex items-center w-full disabled"
                            variant={"outline"}
                        >
                            <h2 className="px-4 font-semibold tracking-tight">
                                Coming soon...
                            </h2>
                        </Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="font-semibold tracking-tight">
                            Want to Contribute?
                        </CardTitle>
                        <Workflow className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="pb-4">
                        <p className="text-xs text-muted-foreground">
                            Help the community and earn exciting rewards!!
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="px-3 py-2 flex items-center w-full"
                            variant={"outline"}
                        >
                            <h2 className="px-4 font-semibold tracking-tight">
                                Contribute
                            </h2>
                        </Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <CardTitle className="font-semibold tracking-tight">
                            Latest changes
                        </CardTitle>
                        <PencilLine className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <ul className="list-style-none">
                            <li className="flex ml-1 pt-0 gap-1 pb-3 relative">
                                <div className="w-[1px] absolute top-2 bottom-0 left-0 h-full bg-muted-foreground"></div>
                                <div className="mt-0 bg-transparent">
                                    <svg
                                        aria-hidden="true"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        version="1.1"
                                        width="16"
                                        data-view-component="true"
                                        className="mb-2 -ml-[0.45rem] fill-muted-foreground"
                                    >
                                        <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
                                    </svg>
                                </div>
                                <div className="TimelineItem-body mt-n1">
                                    <div className="text-xs text-muted-foreground dashboard-changelog-timestamp">
                                        12 hours ago
                                    </div>
                                    <Link
                                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary line-clamp-2"
                                        href="/changelog/2023-10-02-new-dashboard"
                                    >
                                        New Dashboard
                                    </Link>
                                </div>
                            </li>
                            <li className="flex ml-1 pt-0 gap-1 pb-3 relative">
                                <div className="w-[1px] absolute top-2 bottom-0 left-0 h-full bg-muted-foreground"></div>
                                <div className="mt-0 bg-transparent">
                                    <svg
                                        aria-hidden="true"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        version="1.1"
                                        width="16"
                                        data-view-component="true"
                                        className="mb-2 -ml-[0.45rem] fill-muted-foreground"
                                    >
                                        <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
                                    </svg>
                                </div>
                                <div className="TimelineItem-body mt-n1">
                                    <div className="text-xs text-muted-foreground dashboard-changelog-timestamp">
                                        21 hours ago
                                    </div>
                                    <Link
                                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary line-clamp-2"
                                        href="/changelog/2023-10-02-basic-frontend"
                                    >
                                        Architected basic frontend of the app
                                    </Link>
                                </div>
                            </li>
                            <li className="flex ml-1 pt-0 gap-1 pb-3 relative">
                                <div className="w-[1px] absolute top-2 bottom-0 left-0 h-full bg-muted-foreground"></div>
                                <div className="mt-0 bg-transparent">
                                    <svg
                                        aria-hidden="true"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        version="1.1"
                                        width="16"
                                        data-view-component="true"
                                        className="mb-2 -ml-[0.45rem] fill-muted-foreground"
                                    >
                                        <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
                                    </svg>
                                </div>
                                <div className="TimelineItem-body mt-n1">
                                    <div className="text-xs text-muted-foreground dashboard-changelog-timestamp">
                                        2 days ago
                                    </div>
                                    <Link
                                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary line-clamp-2"
                                        href="/changelog/2023-10-02-auth-with-kinde"
                                    >
                                        Added Authentication using Kinde
                                    </Link>
                                </div>
                            </li>
                            <li className="flex ml-1 pt-0 gap-1 pb-0 relative">
                                <div className="w-[1px] absolute top-2 bottom-0 left-0 h-full bg-muted-foreground"></div>
                                <div className="mt-0 bg-transparent">
                                    <svg
                                        aria-hidden="true"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        version="1.1"
                                        width="16"
                                        data-view-component="true"
                                        className="mb-2 -ml-[0.45rem] fill-muted-foreground"
                                    >
                                        <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
                                    </svg>
                                </div>
                                <div className="TimelineItem-body mt-n1">
                                    <div className="text-xs text-muted-foreground dashboard-changelog-timestamp">
                                        3 days ago
                                    </div>
                                    <Link
                                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary line-clamp-2"
                                        href="/changelog/2023-10-02-new-landing-page"
                                    >
                                        Landing Page
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Link
                            href={"/changelog"}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center w-full"
                        >
                            <ArrowRight className="mr-2 h-4 w-4" />
                            {"View Changelog"}
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
