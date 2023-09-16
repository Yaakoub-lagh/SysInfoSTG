"use client"

import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { ReservartionColumn,columns } from "./columns"
import { DataTable } from "@/components/Datatable"



interface ProfileClientProps{
    data:ReservartionColumn[]
}

const ProfileClient:React.FC<ProfileClientProps> = ({data}) => {
    const router = useRouter()


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Reservation (${data.length})`}
                    subtitle="Gere Vos reservation"
                />
                {/* <Button onClick={()=>router.push(`profile/new`)}>
                    <Plus  className="mr-2 h-4 w-4"/>
                    Add New
                </Button> */}
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