import { db } from "@huddl/db";
import { Overview } from "@web/components/dashboard/Overview";
import { RecentContests } from "@web/components/dashboard/RecentContests";
import { Icons } from "@web/components/global/Icons";
import { Avatar, AvatarFallback } from "@web/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@web/components/ui/card";
import { Award, Flame, PartyPopper, Trophy } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";


export default async function Home({ params }: { params: { username: string}}) {

  const { username } = params;

  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      image: true,
    },
  });

  console.log(user, username);

  // If everything is fine, we can show the dashboard
  return (<Suspense fallback={<div>Loading...</div>}>
    <h1 className="my-8 mb-6 text-2xl font-semibold tracking-tight">
        Profile
    </h1>
    <div className='relative flex items-center space-x-4 pb-10'>
      <div className='relative'>
        <Avatar className="relative w-8 sm:w-12 h-8 sm:h-12">
          {user?.image ? (
            <div className="relative aspect-square h-full w-full">
              <Image
                fill
                src={user.image}
                alt="profile picture"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <AvatarFallback
              className="relative aspect-square h-full w-full"
            >
                <span className="sr-only">{user?.firstName}</span>
                <Icons.user className="h-6 w-6 text-zinc-900" />
            </AvatarFallback>
          )}
          </Avatar>
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center space-x-2'>
              <h1 className='text-lg font-semibold'>{user?.firstName} {user?.lastName}</h1>
              <span className='text-sm text-gray-600'>@{user?.username}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <span className='text-sm text-gray-600'>0 followers</span>
                <span className='text-sm text-gray-600'>0 following</span>
                </div>
                </div>
                </div>
                <section className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Problems Solved
                            </CardTitle>
                            <Award className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">169</div>
                            <p className="text-xs text-muted-foreground">
                                +8 from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Accepted Rate
                            </CardTitle>
                            <PartyPopper className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">71%</div>
                            <p className="text-xs text-muted-foreground">
                                +8.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Contests
                            </CardTitle>
                            <Trophy className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">16</div>
                            <p className="text-xs text-muted-foreground">
                                +4 from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Streak
                            </CardTitle>
                            <Flame className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3 days</div>
                            <p className="text-xs text-muted-foreground">
                                Best: 69 days
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader className="pb-2">
                            <CardTitle>Overview</CardTitle>
                            <CardDescription>
                                Your monthly questions solved.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <Overview />
                        </CardContent>
                    </Card>
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Recent Contests</CardTitle>
                            <CardDescription>
                                Your recent contest performances.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RecentContests />
                        </CardContent>
                    </Card>
                </div>
            </section>
  </Suspense>);
}
