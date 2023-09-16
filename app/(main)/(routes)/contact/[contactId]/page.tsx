
import db from "@/lib/db"
import ContactForm from "./components/Form"

const page = async ({
    params
}:{
    params : {contactId:string}
}) => {

    const billboard = await db.contact.findUnique({
        where:{
            id:params.contactId
        }
    })

    const client = await db.client.findMany()

    return (
        <div className="flex-col h-full w-full">
            <div className="flex-1 space-y-4 p-8 pt-6">
                    <ContactForm initialData={billboard} client={client} />
            </div>
        </div>
    )
}

export default page