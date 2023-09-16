
import db from "@/lib/db"
import ClientForm from "./components/Form"

const page = async ({
    params
}:{
    params : {clientId:string}
}) => {

    const billboard = await db.client.findUnique({
        where:{
            id:params.clientId
        }
    })
    

    return (
        <div className="flex-col h-full w-full">
            <div className="flex-1 space-y-4 p-8 pt-6">
                    <ClientForm initialData={billboard} />
            </div>
        </div>
    )
}

export default page