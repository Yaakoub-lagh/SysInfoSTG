"use client"

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ClientColumns,columns } from "./columns"
import { DataTable } from "@/components/Datatable"


interface ClientclientProps{
    data:ClientColumns[]
}

const Clientclient:React.FC<ClientclientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Client (${data.length})`}
                    subtitle="Gere Vos Client"
                />
                <Button onClick={()=>router.push(`/new`)}>
                    <Plus  className="mr-2 h-4 w-4"/>
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable
            searchKey="name"
            columns={columns}
            data={data}
            />
        </>
    )
}

export default Clientclient