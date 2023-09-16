"use client"


import * as z from "zod"
import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Client, Contact, ProfileType, Status } from "@prisma/client"
import { Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Form ,FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SelectContent } from "@radix-ui/react-select"
import { ProfileColumn } from "../../components/columns"

interface ProfileFormProps{
    initialData:ProfileColumn | null
}

/*
        id       : string
    name     : string
    lname    : string
    functions: string
    email    : string
    phone    : string
    address  : string
    client   : Client
*/ 

const formSchema = z.object({
    lname:z.string().min(2),
    name:z.string().min(2),
    type:z.string().min(2)
})

const Types=[
    {
        id:ProfileType.ADMIN,
        label:"Admin"
    },
    {
        id:ProfileType.COMMERCIAL,
        label:"Commercial"
    },
    {
        id:ProfileType.LIVREUR,
        label:"Livreur"
    },
    {
        id:ProfileType.MANAGER,
        label:"Manager"
    },
]

type ProfileFormValues=z.infer<typeof formSchema>

const ProfileForm : React.FC<ProfileFormProps> = ({
    initialData,
}) => {
    const params = useParams()
    const router = useRouter()
    const [loading,setLoading] = useState(false)

    const title = initialData ? "Edit Profile" : "Create Profile"
    const description = initialData ? "Edit a Profile" : "Add a Profile"
    const toastMessage = initialData ? "Profile updated" : "Profile Created"
    const action = initialData ? "Save Changes" : "Create"


    const form = useForm<ProfileFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues : initialData || {
            name : '',
            lname : '',
            type:''
        }
    })

    const onSubmit=async(data:ProfileFormValues)=>{
        try {
            setLoading(true)
            if(initialData){
                await axios.patch(`/api/profile/${params.contactId}`,data)
            }else{
                await axios.post(`/api/profile/`,data)
            }
            router.refresh()
            router.push(`/profile`)
            toast.success(toastMessage)
        } catch (error) {
            toast.error("Something went wrong")
        } finally{
            setLoading(false)
        }
    }

    const onDelete = async()=>{
        try {
            setLoading(true)
            await axios.delete(`/api/profile/${params.clientId}`)
            router.refresh()
            router.push(`/`)
            toast.success("Profile Deleted")
        } catch (error) {
            toast.error("Something went wrong")
        }finally{
            setLoading(false)
        }
    }
    

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={title}
                    subtitle={description}
                />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant='destructive'
                        size="sm"
                        onClick={()=>onDelete}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
                
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Nom"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lname"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Prenom</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Prenom"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Type de profile</FormLabel>
                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a Profile"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-white">
                                            {Types.map((item)=>(
                                                <SelectItem key={item.id} value={item.id}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="ml-auto" disabled={loading}>
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator />
        </>
    )
}

export default ProfileForm