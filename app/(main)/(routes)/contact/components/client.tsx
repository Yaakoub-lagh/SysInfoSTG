"use client"

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { ContactColumns,columns } from "./columns"
import { DataTable } from "@/components/Datatable"


interface ContactClientProps{
    data:ContactColumns[]
}

const ContactClient:React.FC<ContactClientProps> = ({data}) => {
    const router = useRouter()


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Contact (${data.length})`}
                    subtitle="Gere Vos Contact"
                />
                <Button onClick={()=>router.push(`contact/new`)}>
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

export default ContactClient