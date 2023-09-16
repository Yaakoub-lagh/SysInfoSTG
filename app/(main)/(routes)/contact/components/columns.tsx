"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"
import { Client, Status } from "@prisma/client"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ContactColumns = {
    id       : string
    name     : string
    lname    : string
    functions: string
    email    : string
    phone    : string
    address  : string
    client   : Client
}

export const columns: ColumnDef<ContactColumns>[] = [
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
        accessorKey: "functions",
        header: "Fonctions",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Telephone",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "client",
        header: "Nom Client",
        cell:({row})=>(
            <div>
                {row.original.client.name}
            </div>
        )
    },
    {
        id:"actions",
        cell : ({row})=><CellAction data={row.original} />
    }
]