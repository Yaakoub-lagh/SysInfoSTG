
import db from "@/lib/db"
import ProfileForm from "./components/Form"

const page = async ({
    params
}:{
    params : {profileId:string}
}) => {

    const billboard = await db.profile.findUnique({
        where:{
            id:params.profileId
        }
    })


    return (
        <div className="flex-col h-full w-full">
            <div className="flex-1 space-y-4 p-8 pt-6">
                    <ProfileForm initialData={billboard}/>
            </div>
        </div>
    )
}

export default page