import { cn } from "@web/lib/utils";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RightSidebar({ className }: SidebarProps) {
    return (
        <div className={cn("pb-12", className)}>
            <div className="space-y-4 py-4">
                <div className="border-2 pt-2 pb-4 rounded flex flex-col gap-3">
                    <div className="px-4 flex flex-col gap-1">
                        <h2 className="text-lg font-semibold tracking-tight">
                            Start a Contest
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            Practice by yourself or Join a contest with your
                            friends!!
                        </p>
                    </div>
                    <Button className="mx-3 px-3 py-2 flex items-center">
                        <PlusCircleIcon className="mr-2 h-4 w-4" />
                        <h2 className="px-4 font-semibold tracking-tight">
                            Create Contest
                        </h2>
                    </Button>
                </div>
            </div>
        </div>
    );
}
