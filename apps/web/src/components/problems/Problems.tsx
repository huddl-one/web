"use client";

import { Problem } from "@web/app/(app)/problems/page";


import {
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
import { BarChart2, CheckCircle2, Circle, SearchIcon } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";
import { Badge } from "../ui/badge";

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
        <div className="space-y-8 h-full">
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
            <Suspense>
      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell className="text-center">Difficulty</TableHeaderCell>
            <TableHeaderCell className="text-center">Acceptance</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {problems
            .filter((item) => isProblemSelected(item))
            .map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-center">{!item.solved ? (<Circle />) : (<CheckCircle2 className="stroke-green-500"/>)}</TableCell>
                <TableCell className="truncate hover:text-clip"><Link href={"/problems/" + item.slug}>{item.title}</Link></TableCell>
                <TableCell className="text-center">
                <Badge className={`bg-${colors[item.difficulty]}-200 text-${colors[item.difficulty]}-500 hover:bg-${colors[item.difficulty]}-200`}>
                  {item.difficulty}
                </Badge>
              </TableCell>
              <TableCell>
                {/* Random percentage */}
                <div className="flex items-center justify-center space-x-2">
                  <BarChart2 className="w-4 h-4" />
                  <span className="text-sm text-muted-foreground">
                    69%
                  </span>
                </div>
              </TableCell>

              </TableRow>
            ))}
        </TableBody>
      </Table>
      </Suspense>
    </Card>
        </div>
    );
}

export default Problems;

