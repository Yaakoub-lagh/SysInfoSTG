"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"
import { Client, Status } from "@prisma/client"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

/*
    id        String   @id @default(uuid())
    version   String
    date      DateTime
    trimestre String
    date_l    DateTime
    date_finl DateTime
*/

export type LetterColumn = {
    id       : string
    version : string
    date: string
    trimestre: string
    date_l: string
    date_finl: string
}

export const columns: ColumnDef<LetterColumn>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "version",
        header: "Version",
    },
    {
        accessorKey: "date",
        header: "Date Sortie",
    },
    {
        accessorKey: "trimestre",
        header: "Trimestre",
    },
    {
        accessorKey: "date_l",
        header: "Date Livraison",
    },
    {
        accessorKey: "date_finl",
        header: "Date Finale Livraison",
    },
    {
        id:"actions",
        cell : ({row})=><CellAction data={row.original} />
    }
]