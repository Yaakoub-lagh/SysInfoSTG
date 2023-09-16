"use client"

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { LetterColumn,columns } from "./columns"
import { DataTable } from "@/components/Datatable"


interface LetterclientProps{
    data:LetterColumn[]
}

const Letterclient:React.FC<LetterclientProps> = ({data}) => {
    const router = useRouter()


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Lettre (${data.length})`}
                    subtitle="Gere Vos Lettre"
                />
                <Button onClick={()=>router.push(`letter/new`)}>
                    <Plus  className="mr-2 h-4 w-4"/>
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable
                searchKey="version"
                columns={columns}
                data={data}
            />
        </>
    )
}

export default Letterclient