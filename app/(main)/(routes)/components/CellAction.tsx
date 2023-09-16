"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger,DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ClientColumns } from "./columns"
import { Button } from "@/components/ui/button"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { toast } from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import { useState } from "react"



interface CellActionProps{
    data:ClientColumns
}


const CellAction:React.FC<CellActionProps> = ({data}) => {

    const [loading,setLoading]=useState(false)

    const onDelete = async()=>{
        try {
            setLoading(true)
            await axios.delete(`/api/client/${data.id}`)
            router.refresh()
            toast.success("Client Deleted")
        } catch (error) {
            toast.error("Something went wrong")
        }finally{
            setLoading(false)
        }
    }

    const router = useRouter()
    const params = useParams()

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={()=>router.push(`/${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>onDelete()} className="text-rose-500">
                        <Trash className="mr-2 h-4 w-4" />
                        Supprimer
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default CellAction