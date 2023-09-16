"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"
import { Client, ProfileType, Status } from "@prisma/client"
import { cn } from "@/lib/utils"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProfileColumn = {
    id       : string
    name     : string
    lname    : string
    type     : ProfileType
}

export const columns: ColumnDef<ProfileColumn>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Nom",
    },
        {
        accessorKey: "lname",
        header: "Prenom",
    },
    {
        accessorKey: "type",
        header: "Type",
        cell:({row})=>(
            <div className="capitalize">
                <div className={cn("w-fit rounded-lg px-4 py-2 font-bold",
                row.original.type === "ADMIN" ? "text-rose-500 bg-rose-300" : row.original.type === "MANAGER" ? "text-blue-500 bg-blue-300" : row.original.type === "LIVREUR" ?  "text-emerald-500 bg-emerald-300" : "text-yellow-500 bg-yellow-300"
                )}>
                    {row.original.type.toLocaleLowerCase()}
                </div>
            </div>
        )
    },
    {
        id:"actions",
        cell : ({row})=><CellAction data={row.original} />
    }
]