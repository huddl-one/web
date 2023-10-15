"use client";

import { Problem } from "@admin/app/(app)/problems/page";


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
import { BarChart2, Eye, Pencil, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

const colors: {
  [key: string]: "slate"| "gray"| "zinc"| "neutral"| "stone"| "red"| "orange"| "amber"| "yellow"| "lime"| "green"| "emerald"| "teal"| "cyan"| "sky"| "blue"| "indigo"| "violet"| "purple"| "fuchsia"| "pink"| "rose";
} = {
  "easy": "emerald",
  "medium": "amber",
  "hard": "rose",
};

function Problems({
    problems,
}: {problems: Problem[]}) {

    const [difficulty, setDifficulty] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const difficultyTypes = [
      "easy",
      "medium",
      "hard",
    ];

  const isProblemSelected = (problem: Problem) =>
  (difficulty.includes(problem.difficulty) || difficulty.length === 0) && ( problem.title.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === "");


    return (
        <div className="col-span-3 lg:col-span-4 space-y-8 h-full">
            <div>
                <h1 className="my-8 mb-4 text-2xl font-semibold tracking-tight">
                    Problems
                </h1>
                <p className="text-muted-foreground">Here&apos;s problems!</p>
            </div>
            <Card>
            <div className="flex justify-center items-center gap-5">
            <TextInput
                    icon={SearchIcon}
                    placeholder="Search..."
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
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
            </div>
      
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

