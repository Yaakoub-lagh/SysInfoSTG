"use client"

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { ProfileColumn,columns } from "./columns"
import { DataTable } from "@/components/Datatable"


interface ProfileClientProps{
    data:ProfileColumn[]
}

const ProfileClient:React.FC<ProfileClientProps> = ({data}) => {
    const router = useRouter()


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Profile (${data.length})`}
                    subtitle="Gere Vos Profile"
                />
                <Button onClick={()=>router.push(`profile/new`)}>
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

export default ProfileClient