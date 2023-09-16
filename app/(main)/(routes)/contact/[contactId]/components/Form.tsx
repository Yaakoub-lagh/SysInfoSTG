"use client"


import * as z from "zod"
import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Client, Contact, Status } from "@prisma/client"
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

interface ContactFormProps{
    initialData:Contact | null
    client:Client[]
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
    functions:z.string().min(2),
    email:z.string().min(2),
    phone:z.string().min(2),
    address:z.string().min(2),
    client : z.string().min(2)
})

type ContactFormValues=z.infer<typeof formSchema>

const ContactForm : React.FC<ContactFormProps> = ({
    initialData,
    client
}) => {
    const params = useParams()
    const router = useRouter()
    const [loading,setLoading] = useState(false)

    const title = initialData ? "Edit Contact" : "Create Contact"
    const description = initialData ? "Edit a Contact" : "Add a Contact"
    const toastMessage = initialData ? "Contact updated" : "Contact Created"
    const action = initialData ? "Save Changes" : "Create"


    const form = useForm<ContactFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues : initialData || {
            name : '',
            lname : '',
            functions:'',
            email : '',
            phone : '',
            address : '',
            client : '',
        }
    })

    const onSubmit=async(data:ContactFormValues)=>{
        try {
            setLoading(true)
            if(initialData){
                await axios.patch(`/api/contact/${params.contactId}`,data)
            }else{
                await axios.post(`/api/contact/`,data)
            }
            router.refresh()
            router.push(`/contact`)
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
            await axios.delete(`/api/client/${params.clientId}`)
            router.refresh()
            router.push(`/`)
            toast.success("Client Deleted")
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
                            name="functions"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Fonction</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Fonctions"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                                                <FormField
                            control={form.control}
                            name="email"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                                                <FormField
                            control={form.control}
                            name="phone"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Telephone</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Telephone"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Address"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="client"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Client</FormLabel>
                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a Client"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-white">
                                            {client.map((item)=>(
                                                <SelectItem key={item.id} value={item.id}>
                                                    {item.name}
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

export default ContactForm