
import db from "@/lib/db"
import ContactForm from "./components/Form"
import { LetterColumn } from "../components/columns"
import { format } from "date-fns"

const page = async ({
    params
}:{
    params : {letterId:string}
}) => {

    const billboard = await db.letter.findUnique({
        where:{
            id:params.letterId
        }
    })

    return (
        <div className="flex-col h-full w-full">
            <div className="flex-1 space-y-4 p-8 pt-6">
                    <ContactForm initialData={billboard} />
            </div>
        </div>
    )
}

export default page