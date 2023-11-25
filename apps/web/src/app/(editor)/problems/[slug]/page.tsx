
import { db } from "@huddl/db";
import Workspace from "@web/components/prblmpage/Workspace";


export default async function Page({ params }: { params: { slug: string } }) {

    const problem = await db.problem.findUnique({
        where: {
            slug: params.slug,
        },
    });

    // If everything is fine, we can show the dashboard
    // return problem ? (
    //     <>
    //         <div className="col-span-3">
    //             <section className="bg-gray-100 p-2 px-3 rounded-md">
    //                 <h1 className="text-2xl font-semibold tracking-tight mb-2">
    //                     1. {problem.title}
    //                 </h1>
    //                 <div className="flex gap-2 items-center mb-2">
    //                     <Badge
    //                         className={`bg-${
    //                             colors[problem.difficulty]
    //                         }-100 text-${
    //                             colors[problem.difficulty]
    //                         }-500 hover:bg-${colors[problem.difficulty]}-100`}
    //                     >
    //                         {problem.difficulty}
    //                     </Badge>
    //                     <Badge
    //                         className={`bg-blue-100 text-blue-500 hover:bg-blue-100`}
    //                     >
    //                         Arrays
    //                     </Badge>
    //                     <Badge
    //                         className={`bg-blue-100 text-blue-500 hover:bg-blue-100`}
    //                     >
    //                         Counting
    //                     </Badge>
    //                 </div>
    //                 <div className="flex gap-2 mb-2">
    //                     <Button variant={"secondary"} size={"icon"}>
    //                         <Bookmark />
    //                     </Button>
    //                     <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground border-2 border-input px-2 rounded-md">
    //                         <BarChart2 className="w-4 h-4" />
    //                         <span className="text-sm text-muted-foreground">
    //                             69%
    //                         </span>
    //                     </div>
    //                     <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground border-2 border-input px-2 rounded-md ">
    //                         <ThumbsUp className="w-4 h-4 text-green-500" />
    //                         <span className="text-sm text-green-500">420</span>
    //                     </div>
    //                     <div className="flex items-center space-x-2 bg-secondary text-secondary-foreground border-2 border-input px-2 rounded-md">
    //                         <ThumbsDown className="w-4 h-4 text-rose-500" />
    //                         <span className="text-sm text-rose-500">4</span>
    //                     </div>
    //                 </div>
    //             </section>

    //             <p>{JSON.stringify(problem)}</p>
    //         </div>
    //     </>
    // ) : (
    //     <div className="col-span-3">
    //         <h1 className="my-8 text-2xl font-semibold tracking-tight">
    //             Does not exist
    //         </h1>
    //     </div>
    // );


    return problem ? (
        <Workspace problem={problem} />
    ) : (
        <div className="col-span-3">
            <h1 className="my-8 text-2xl font-semibold tracking-tight">
                Does not exist
            </h1>
        </div>
    );
}