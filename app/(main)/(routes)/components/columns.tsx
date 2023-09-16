"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"
import { Status } from "@prisma/client"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ClientColumns = {
    id         : string
    id_sage    : string
    name       : string
    city       : string
    phone      : string
    address    : string
    type       : boolean
    letter_nbr :number
    country    : string
    status     :Status
    Zone       : string
}

export const columns: ColumnDef<ClientColumns>[] = [
    {
        accessorKey: "id_sage",
        header: "Id Sage",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "type",
        header: "Type",
        cell:({row})=>(
            <div>
                {row.original.type ? "Prospect" : "Client"}
            </div>
        )
    },
    {
        accessorKey: "country",
        header: "Pays",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "city",
        header: "Ville",
    },
    {
        accessorKey: "phone",
        header: "Telephone",
    },
    {
        accessorKey: "Zone",
        header: "Commercial",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        id:"actions",
        cell : ({row})=><CellAction data={row.original} />
    }
]