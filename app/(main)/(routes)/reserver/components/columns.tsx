"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Client, ProfileType, Status } from "@prisma/client"
import { cn } from "@/lib/utils"
import { Package, PackageOpen } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ReservartionColumn = {
    id:string
    name:string
    cname:string
    address:string
    city:string
    version:string
    status:boolean
}

export const columns: ColumnDef<ReservartionColumn>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Nom",
    },
    {
        accessorKey: "cname",
        header: "Contact",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "city",
        header: "City",
    },
    {
        accessorKey: "version",
        header: "Version",
    },
    {
        accessorKey: "status",
        header: "Status",
        
        cell:({row})=>{

            return (
                <div 
                className="cursor-pointer flex items-center justify-center"
                >
                    <Checkbox defaultChecked={row.original.status} />
                </div>
            )
        }
    },
]