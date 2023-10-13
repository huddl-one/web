"use client";

import { Award, Flame, PartyPopper, Trophy } from "lucide-react";
import { Overview } from "./Overview";
import { RecentContests } from "./RecentContests";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";

const posts = [
    {
        title: "Tips for staying focused while coding",
        content:
            "Hey everyone! I've been working on a big coding project lately and I've found it really helpful to have a few strategies for staying focused and productive. Here are a few tips that have worked for me:\n- Take breaks every hour or so to stretch and move around\n- Use a timer to break up your work into manageable chunks\n- Listen to music or white noise to help block out distractions\n- Keep a clean and organized workspace\n- Stay hydrated and nourished throughout the day\nI hope these tips are helpful for you too! Let me know if you have any other strategies that work well for you.",
        author: "John Smith",
        avatar: "/avatars/02.png",
        date: "1 week ago",
    },
    {
        title: "How to stay motivated?",
        content:
            "Hii Buddy! If you are learning a language, do it. If you are doing DSA, do it. If you are doing Development, do it. Don't ever feel useless, or a person who finds himself/herself behind of all. Every person who might you know have also started from SCRATCH and he didn't stop until he master it. This is what you should do. I have also faced many bad situations even might be more than yours but i never feel demotivated because i was Praying, having Faith in GOD and knowing that all i started will not be a Gibberish thing for me. There may be your friend, Parents, relatives or anyone else saying you why are you not doing so and so. Just tell them 'MY TIME IS COMING'. If this helped you, please consider upvoting!",
        author: "Olivia Martin",
        avatar: "/avatars/01.png",
        date: "2 days ago",
    },
    {
        title: "How to debug your code effectively",
        content:
            "Hi everyone! I've been working on a lot of coding projects lately and I've found that debugging can be one of the most frustrating parts of the process. Here are a few tips that have helped me debug my code more effectively:\n- Use console.log() statements to track the flow of your code\n- Break your code down into smaller pieces to isolate the problem\n- Use a debugger tool to step through your code line by line\n- Take a break and come back to the problem with fresh eyes\nRemember, debugging is a normal part of the coding process and it's okay to ask for help if you're stuck. Good luck!",
        author: "Alice Smith",
        avatar: "/avatars/03.png",
        date: "2 weeks ago",
    },
    {
        title: "Tips for choosing the right programming language for you",
        content:
            "Hey everyone! Choosing the right programming language for you can be a daunting task, but it's important to consider your interests, goals, and experience when making your decision. Here are a few tips to help you choose the right language for you:\n- Think about what you want to do with programming. Are you interested in web development, mobile development, data science, or something else? Once you know what you want to do, you can start to research which languages are best suited for that area.\n- Consider your experience level. If you're a beginner, you may want to choose a language that is relatively easy to learn, such as Python or JavaScript. If you're more experienced, you may want to choose a language that is more powerful and versatile, such as C++ or Java.\n- Try out a few different languages before you commit to one. There are many online resources and tutorials available that can help you learn the basics of different languages. Once you've tried out a few, you can decide which one you feel most comfortable with.\nI hope these tips help you choose the right programming language for you! Let me know if you have any other questions.",
        author: "John Smith",
        avatar: "/avatars/02.png",
        date: "1 week ago",
    },
    {
        title: "How to prepare for a coding interview",
        content:
            "Hi everyone! I've been through a few coding interviews in my time and I've learned a lot about how to prepare. Here are a few tips that have helped me:\n- Practice solving coding problems. There are many online resources and platforms where you can find coding problems to practice. I recommend LeetCode, HackerRank, and Codewars.\n- Focus on the most common data structures and algorithms. There are a few data structures and algorithms that are commonly asked in coding interviews. I recommend learning the following:\n    * Data structures: arrays, linked lists, stacks, queues, hash tables, binary trees\n    * Algorithms: sorting, searching, dynamic programming, recursion, greedy algorithms\n- Understand the design patterns. Design patterns are reusable solutions to common programming problems. I recommend learning the following design patterns:\n    * Singleton, factory, builder, observer, command, adapter, facade\n- Practice coding in different languages. Many companies will ask you to code in a specific language during your interview. I recommend practicing coding in the languages that are most popular in the industry.\nI hope these tips help you prepare for your next coding interview! Good luck!",
        author: "Olivia Martin",
        avatar: "/avatars/01.png",
        date: "2 days ago",
    },
    {
        title: "How to build a good coding portfolio",
        content:
            "Hi everyone! A coding portfolio is a great way to showcase your skills and experience to potential employers. Here are a few tips on how to build a good coding portfolio:\n- Include a variety of projects. Your portfolio should include a variety of projects that demonstrate your skills in different areas. This could include personal projects, open source projects, or projects you've worked on at previous jobs.\n- Write clear and concise descriptions. For each project in your portfolio, be sure to include a clear and concise description of what the project is, what you learned while working on it, and what technologies you used.\n- Make it easy to browse your code. Your portfolio should make it easy for potential employers to browse your code. This means using a consistent coding style and formatting, and including comments in your code.\n- Get feedback from others. Once you have a draft of your portfolio, ask friends, family, or colleagues to review it and give you feedback. This will help you identify any areas that need improvement.\nI hope these tips help you build a good coding portfolio! Good luck!",
        author: "Alice Smith",
        avatar: "/avatars/03.png",
        date: "2 weeks ago",
    },
    {
        title: "Top 5 Algorithms Every Programmer Should Know",
        content:
            "Hey folks! As a seasoned developer, I've compiled a list of the top 5 algorithms that I believe every programmer should be familiar with. These algorithms are the foundation of many coding challenges and interview questions. Here's the list:\n1. Binary Search\n2. Merge Sort\n3. Depth-First Search (DFS)\n4. Breadth-First Search (BFS)\n5. Dynamic Programming\nMastering these algorithms will significantly boost your problem-solving skills. Happy coding!",
        author: "David Johnson",
        avatar: "/avatars/04.png",
        date: "3 weeks ago",
    },
    {
        title: "The Art of Code Optimization",
        content:
            "Greetings fellow coders! In today's post, I'll be delving into the art of code optimization. Writing efficient code is crucial for improving the performance of your applications. Here are some optimization techniques to consider:\n- Use efficient data structures\n- Minimize nested loops\n- Profile your code to identify bottlenecks\n- Cache frequently used results\n- Avoid premature optimization\nOptimizing your code not only enhances speed but also your problem-solving skills. Keep coding!",
        author: "Sophia Lee",
        avatar: "/avatars/05.png",
        date: "4 weeks ago",
    },
    {
        title: "Mastering Data Structures: Linked Lists",
        content:
            "Hello aspiring developers! Today, let's dive deep into one of the fundamental data structures: Linked Lists. Linked Lists are versatile and used in various coding problems. In this post, we'll cover:\n- Singly Linked Lists\n- Doubly Linked Lists\n- Circular Linked Lists\n- Common operations (insertion, deletion)\n- Pros and cons\nUnderstanding Linked Lists will strengthen your data structure knowledge. Happy coding!",
        author: "Michael Wang",
        avatar: "/avatars/06.png",
        date: "1 month ago",
    },
    {
        title: "Cracking the Coding Interview: Tips and Strategies",
        content:
            "Hi there, job seekers! Landing your dream tech job often requires acing the coding interview. Here are some tips and strategies to help you prepare:\n- Practice coding challenges daily\n- Review data structures and algorithms\n- Mock interviews with peers\n- Behavioral interview prep\n- Stay calm and communicate\nRemember, practice makes perfect. Good luck on your coding journey!",
        author: "Emma Garcia",
        avatar: "/avatars/07.png",
        date: "1 month ago",
    },
    {
        title: "The Power of Pair Programming",
        content:
            "Hey coders! Have you tried pair programming? It's a collaborative coding technique where two developers work together on the same codebase. Benefits include:\n- Faster problem-solving\n- Improved code quality\n- Knowledge sharing\n- Reduced bugs\nGive it a shot with a coding buddy and experience the magic of pair programming!",
        author: "Daniel Patel",
        avatar: "/avatars/08.png",
        date: "2 months ago",
    },
    {
        title: "JavaScript vs. Python: Which is Right for You?",
        content:
            "Hello developers! Choosing a programming language can be a tough decision. In this post, we'll compare JavaScript and Python, two popular languages. Consider factors like:\n- Use cases\n- Learning curve\n- Ecosystem\n- Job market\nBoth languages have their strengths, so choose the one that aligns with your goals and projects.",
        author: "Liam Wilson",
        avatar: "/avatars/09.png",
        date: "2 months ago",
    },
    {
        title: "How to Build a Portfolio that Gets You Hired",
        content:
            "Hi job seekers! Your portfolio is your digital resume. Here are some tips to create a compelling portfolio that stands out:\n- Showcase projects relevant to the job\n- Provide detailed project descriptions\n- Highlight your skills and contributions\n- Keep it organized and visually appealing\n- Include your best work\nA strong portfolio can make all the difference in your job hunt!",
        author: "Ava Rodriguez",
        avatar: "/avatars/10.png",
        date: "3 months ago",
    },
    {
        title: "The Importance of Soft Skills in Tech",
        content:
            "Hello developers! Beyond technical skills, soft skills are essential in the tech world. Develop skills like:\n- Communication\n- Teamwork\n- Problem-solving\n- Time management\n- Adaptability\nThese skills will make you a well-rounded and valuable team member. Don't underestimate their importance!",
        author: "Noah Mitchell",
        avatar: "/avatars/11.png",
        date: "3 months ago",
    },
    {
        title: "Getting Started with Machine Learning",
        content:
            "Greetings AI enthusiasts! Interested in machine learning? Here's a beginner's guide to get you started:\n- Learn Python\n- Understand basic math and statistics\n- Study machine learning algorithms\n- Work on projects\n- Join ML communities\nMachine learning is a fascinating field with endless possibilities. Start your journey today!",
        author: "Isabella Turner",
        avatar: "/avatars/12.png",
        date: "4 months ago",
    },
    {
        title: "The Role of Testing in Software Development",
        content:
            "Hey coders! Testing is a critical part of software development. In this post, we'll explore the importance of testing, types of testing (unit, integration, etc.), and testing frameworks. Remember, robust testing ensures the reliability of your code. Happy coding and testing!",
        author: "William Clark",
        avatar: "/avatars/13.png",
        date: "4 months ago",
    },
];

const Dashboard = () => {
    return (
        <div className="col-span-3 space-y-8">
            <section className="space-y-4">
                <h1 className="my-8 mb-6 text-2xl font-semibold tracking-tight">
                    Dashboard
                </h1>
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
                            <div className="text-2xl font-bold">80%</div>
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

            <section className="space-y-4 pb-12">
                <h2 className="my-8 text-2xl font-semibold tracking-tight">
                    Discussions
                </h2>

                {posts.map((post, index) => (
                    <Card key={index}>
                        <CardHeader className="pb-2">
                            <CardTitle className="font-medium">
                                {post.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {post.content}
                            </p>
                        </CardContent>
                        <CardFooter className="flex gap-2 items-center">
                            <section className="flex gap-2 items-center">
                                <p>By</p>
                                <div className="flex items-center gap-1">
                                    <Avatar className="h-4 w-4">
                                        <AvatarImage
                                            src={post.avatar}
                                            alt="Avatar"
                                        />
                                        <AvatarFallback>
                                            {post.author
                                                .charAt(0)
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <p className="text-sm font-medium leading-none">
                                        {post.author}
                                    </p>
                                </div>
                            </section>
                            <svg
                                aria-hidden="true"
                                height="16"
                                viewBox="0 0 16 16"
                                version="1.1"
                                width="16"
                                data-view-component="true"
                                className=" fill-muted-foreground"
                            >
                                <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
                            </svg>
                            <section className="text-muted-foreground">
                                {post.date}
                            </section>
                        </CardFooter>
                    </Card>
                ))}
            </section>
        </div>
    );
};

export default Dashboard;
