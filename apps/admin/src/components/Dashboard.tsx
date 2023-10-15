"use client";

import { Overview } from "./Overview";
import { RecentContests } from "./RecentContests";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "./ui/card";

const Dashboard = () => {
    return (
        <div className="col-span-3 lg:col-span-4 space-y-8">
            <section className="space-y-4">
                <h1 className="my-8 mb-6 text-2xl font-semibold tracking-tight">
                    Dashboard
                </h1>
                <div className="grid gap-4">
                    <Card className="">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>
                                Recent User Activity
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RecentContests />
                        </CardContent>
                    </Card>
                    <Card className="">
                        <CardHeader className="pb-2">
                            <CardTitle>Performance</CardTitle>
                            <CardDescription>Comparison between Sales and Profit
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <Overview />
                        </CardContent>
                    </Card>
                </div>
            </section>

        </div>
    );
};

export default Dashboard;
