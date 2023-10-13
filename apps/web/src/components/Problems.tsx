"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@web/app/(app)/problems/components/data-table";

interface DataTableProps<TData, TValue> {
    tasks: TData[];
    columns: ColumnDef<TData, TValue>[];
}

function Problems<TData, TValue>({
    tasks,
    columns,
}: DataTableProps<TData, TValue>) {
    return (
        <div className="col-span-3 space-y-8 h-full">
            <div>
                <h1 className="my-8 mb-4 text-2xl font-semibold tracking-tight">
                    Problems
                </h1>
                <p className="text-muted-foreground">Here&apos;s problems!</p>
            </div>
            <DataTable data={tasks} columns={columns} />
        </div>
    );
}

export default Problems;
