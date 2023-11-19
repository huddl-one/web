"use client";

import { Problem } from "@admin/app/(app)/problems/page";


import { trpc } from "@admin/app/_trpc/client";
import { newProblemReq } from "@admin/utils/types/problem-editor";
import { slugify } from "@huddl/utils";
import {
  Badge,
  Card,
  MultiSelect,
  MultiSelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TextInput
} from "@tremor/react";
import { BarChart2, Eye, Pencil, PlusCircleIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export const colors: {
  [key: string]: "slate"| "gray"| "zinc"| "neutral"| "stone"| "red"| "orange"| "amber"| "yellow"| "lime"| "green"| "emerald"| "teal"| "cyan"| "sky"| "blue"| "indigo"| "violet"| "purple"| "fuchsia"| "pink"| "rose";
} = {
  "easy": "emerald",
  "medium": "amber",
  "hard": "rose",
};

export const difficultyTypes = [
  "easy",
  "medium",
  "hard",
];

function Problems({
    problems,
}: {problems: Problem[]}) {

    const [difficulty, setDifficulty] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [newProblem, setNewProblem] = useState<boolean>(false);

    const [problemName, setProblemName] = useState<string>("");
    const [problemDifficulty, setProblemDifficulty] = useState<string>("easy");

  const isProblemSelected = (problem: Problem) =>
  (difficulty.includes(problem.difficulty) || difficulty.length === 0) && ( problem.title.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === "");

  const {mutate: addNewProblem} = trpc.problem.newProblem.useMutation({
    onSuccess: ({redirect}) => {
      window.location.href = redirect ?? "/problems"
    }
  })

    return (
        <div className="col-span-3 lg:col-span-4 space-y-8 h-full">
            <div>
                <h1 className="my-8 mb-4 text-2xl font-semibold tracking-tight">
                    Problems
                </h1>
                <p className="text-muted-foreground">Here&apos;s problems!</p>
            </div>

            {/* Problems Table */}
            <Card>
            <div className="flex justify-center items-center gap-5">

              {/* Search Bar */}
              <TextInput
                icon={SearchIcon}
                placeholder="Search..."
                onChange={(event) => setSearchQuery(event.target.value)}
              />

              {/* Difficulty Mutliselect filter */}
              <MultiSelect
                onValueChange={setDifficulty}
                placeholder="Filter Difficulty..."
                className="max-w-xs"
              >
                {difficultyTypes.map((item) => (
                  <MultiSelectItem key={item} value={item}>
                    {item}
                  </MultiSelectItem>
                ))}
              </MultiSelect>

              {/* Modal Trigger for new problem */}
              <Button className="w-1/3 2xl:w-1/4 flex items-center gap-3" onClick={() => setNewProblem(true)}>
                  <PlusCircleIcon className="w-4 h-4" /> Add Problem
              </Button>
            </div>
                  
            {/* Modal for new problem */}
            {newProblem && (
              <Modal toClose={setNewProblem} popupTitle="New problem" popupDescription="Add a new problem" popupCTA="Add" popupCTAHandler={() => {
                const data = {
                  difficulty: problemDifficulty,
                  title: problemName,
                }
                const {difficulty, title} = newProblemReq.parse(data);
                addNewProblem({difficulty, title});
              }}
                >
                {/* Modal Form */}
                <form>
                  <div className="grid w-full items-center gap-4">
                    
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Name of the problem" onChange={
                        (event) => setProblemName(event.target.value)
                      }/>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Slug</Label>
                      <Input id="slug" placeholder="Slug of the problem" disabled value={slugify(problemName)}/>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select onValueChange={
                        (value) => setProblemDifficulty(value)
                      }>
                        <SelectTrigger id="difficulty">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {difficultyTypes.map((item) => (
                            <SelectItem key={item} value={item}>
                              <Badge color={colors[item]}>
                                {item}
                              </Badge>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </form>
              </Modal>)}
      
              <Table className="mt-6">
                
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell className="text-center">Difficulty</TableHeaderCell>
                    <TableHeaderCell className="text-center">Published</TableHeaderCell>
                    <TableHeaderCell className="text-center">Edit</TableHeaderCell>
                    <TableHeaderCell className="text-center">Public View</TableHeaderCell>
                    <TableHeaderCell className="text-center">Analytics</TableHeaderCell>      
                  </TableRow>
                </TableHead>

                <TableBody>
                  {problems
                    .filter((item) => isProblemSelected(item))
                    .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="truncate hover:text-clip">{item.title}</TableCell>
                        <TableCell className="text-center">
                        <Badge color={colors[item.difficulty]}>
                          {item.difficulty}
                        </Badge>
                      </TableCell>
                        <TableCell className="text-center">{item.published ? (<Badge color="blue">Public</Badge>) : (<Badge color="gray">Draft</Badge>)}</TableCell>
                        <TableCell>
                        <Link href={"/problems/" + item.slug}>
                        <Button variant="secondary" color="gray" className="flex gap-2 items-center mx-auto">
                        <Pencil className="w-4 h-4" /> Edit
                        </Button>
                        </Link>
                      </TableCell>
                      <TableCell>
                      <a href={process.env.NEXT_PUBLIC_CUST_APP + "/problems/" + item.slug} target="_blank">
                        <Button variant="secondary" color="gray" className="flex gap-2 items-center mx-auto">
                        <Eye className="w-4 h-4" /> View
                        </Button>
                        </a>
                      </TableCell>
                      <TableCell>
                        <Button variant="secondary" color="gray" className="flex gap-2 items-center mx-auto" disabled>
                        <BarChart2 className="w-4 h-4" /> Analyze
                        </Button>
                      </TableCell>
                      </TableRow>
                    ))}
                </TableBody>

              </Table>
              
            </Card>
        </div>
    );
}

export default Problems;

