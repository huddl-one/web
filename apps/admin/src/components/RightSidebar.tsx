import {
  ArrowRight,
  PencilLine
} from "lucide-react";
import Link from "next/link";

import { cn } from "@huddl/utils";

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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="font-semibold tracking-tight">
              Latest changes
            </CardTitle>
            <PencilLine className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <ul className="list-style-none">
              <li className="relative ml-1 flex gap-1 pb-3 pt-0">
                <div className="bg-muted-foreground absolute bottom-0 left-0 top-2 h-full w-[1px]"></div>
                <div className="mt-0 bg-transparent">
                  <svg
                    aria-hidden="true"
                    height="16"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    data-view-component="true"
                    className="fill-muted-foreground -ml-[0.45rem] mb-2"
                  >
                    <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
                  </svg>
                </div>
                <div className="TimelineItem-body mt-n1">
                  <div className="text-muted-foreground dashboard-changelog-timestamp text-xs">
                    12 hours ago
                  </div>
                  <Link
                    className="text-muted-foreground hover:text-primary line-clamp-2 text-sm font-medium transition-colors"
                    href="/changelog/2023-10-02-new-dashboard"
                  >
                    New Dashboard
                  </Link>
                </div>
              </li>
              <li className="relative ml-1 flex gap-1 pb-3 pt-0">
                <div className="bg-muted-foreground absolute bottom-0 left-0 top-2 h-full w-[1px]"></div>
                <div className="mt-0 bg-transparent">
                  <svg
                    aria-hidden="true"
                    height="16"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    data-view-component="true"
                    className="fill-muted-foreground -ml-[0.45rem] mb-2"
                  >
                    <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
                  </svg>
                </div>
                <div className="TimelineItem-body mt-n1">
                  <div className="text-muted-foreground dashboard-changelog-timestamp text-xs">
                    21 hours ago
                  </div>
                  <Link
                    className="text-muted-foreground hover:text-primary line-clamp-2 text-sm font-medium transition-colors"
                    href="/changelog/2023-10-02-basic-frontend"
                  >
                    Architected basic frontend of the app
                  </Link>
                </div>
              </li>
              <li className="relative ml-1 flex gap-1 pb-3 pt-0">
                <div className="bg-muted-foreground absolute bottom-0 left-0 top-2 h-full w-[1px]"></div>
                <div className="mt-0 bg-transparent">
                  <svg
                    aria-hidden="true"
                    height="16"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    data-view-component="true"
                    className="fill-muted-foreground -ml-[0.45rem] mb-2"
                  >
                    <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
                  </svg>
                </div>
                <div className="TimelineItem-body mt-n1">
                  <div className="text-muted-foreground dashboard-changelog-timestamp text-xs">
                    2 days ago
                  </div>
                  <Link
                    className="text-muted-foreground hover:text-primary line-clamp-2 text-sm font-medium transition-colors"
                    href="/changelog/2023-10-02-auth-with-kinde"
                  >
                    Added Authentication using Kinde
                  </Link>
                </div>
              </li>
              <li className="relative ml-1 flex gap-1 pb-0 pt-0">
                <div className="bg-muted-foreground absolute bottom-0 left-0 top-2 h-full w-[1px]"></div>
                <div className="mt-0 bg-transparent">
                  <svg
                    aria-hidden="true"
                    height="16"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    data-view-component="true"
                    className="fill-muted-foreground -ml-[0.45rem] mb-2"
                  >
                    <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
                  </svg>
                </div>
                <div className="TimelineItem-body mt-n1">
                  <div className="text-muted-foreground dashboard-changelog-timestamp text-xs">
                    3 days ago
                  </div>
                  <Link
                    className="text-muted-foreground hover:text-primary line-clamp-2 text-sm font-medium transition-colors"
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
              className="text-muted-foreground hover:text-primary flex w-full items-center text-sm font-medium transition-colors"
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
