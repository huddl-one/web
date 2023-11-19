"use client";

import { Card, MultiSelect, MultiSelectItem, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, TextInput } from "@tremor/react";
import { Eye, Router, SearchIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const colors: {
    [key: string]: "slate"| "gray"| "zinc"| "neutral"| "stone"| "red"| "orange"| "amber"| "yellow"| "lime"| "green"| "emerald"| "teal"| "cyan"| "sky"| "blue"| "indigo"| "violet"| "purple"| "fuchsia"| "pink"| "rose";
  } = {
    "admin": "emerald",
    "user": "blue",
  };

function Users({
    users,
}: {users: any[]}) {
    const [role, setRole] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const RoleTypes = [
      "admin",
      "user",
    ];

  const isUserSelected = (user: any) =>
  ((role === user.roles) || role.length === 0) && ( user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === "");
    return (
        <div className="col-span-3 lg:col-span-4 space-y-8 h-full">
            <div>
                <h1 className="my-8 mb-4 text-2xl font-semibold tracking-tight">
                Users
                </h1>
                <p className="text-muted-foreground">Here&apos;s all users!</p>
            </div>
            <Card>
            <div className="flex justify-center items-center gap-5">
            <TextInput
                    icon={SearchIcon}
                    placeholder="Search..."
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
        <MultiSelect
            onValueChange={setRole}
            placeholder="Filter Based on Roles..."
            className="max-w-xs"
        >
            {RoleTypes.map((item) => (
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
            <TableHeaderCell className="text-center">Roles</TableHeaderCell>
            <TableHeaderCell className="text-center">Created On</TableHeaderCell>
            <TableHeaderCell className="text-center">Profile</TableHeaderCell>
            <TableHeaderCell className="text-center">Analytics</TableHeaderCell>
            
          </TableRow>
        </TableHead>

        <TableBody>
          {users
            .filter((item) => isUserSelected(item))
            .map((item) => (
              <TableRow key={item.id}>
                <TableCell className="truncate hover:text-clip">{item.firstName + " " + item.lastName}</TableCell>
                <TableCell className="text-center">
                {/* {item.roles && item.roles[0] && (<Badge color={colors[item.roles[0]]}>
                  {item.roles}
                </Badge>)} */}{item.roles[0]}
              </TableCell>
                <TableCell className="text-center">{item.createdAt.toDateString()}</TableCell>
              <TableCell>
              <a href={process.env.NEXT_PUBLIC_CUST_APP + "/" + item.firstName} target="_blank">
                <Button variant="secondary" color="gray" className="flex gap-2 items-center mx-auto">
                <Eye className="w-4 h-4" /> View
                </Button>
                </a>
              </TableCell>
              <TableCell>
                <Button variant="secondary" color="gray" className="flex gap-2 items-center mx-auto" disabled>
                <Router className="w-4 h-4" /> Activity
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

export default Users;
