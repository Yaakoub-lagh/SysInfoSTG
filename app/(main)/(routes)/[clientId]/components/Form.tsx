"use client"


import * as z from "zod"
import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Client, Status } from "@prisma/client"
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
import { Checkbox } from "@/components/ui/checkbox"

interface ClientFormProps{
    initialData:Client | null
}

const Comm =[
    {
        id:"Zineb",
        label:"Zineb",
    },
    {
        id:"Ismail",
        label:"Ismail",
    },
    {
        id:"Fadil",
        label:"Fadil"
    }
]

const statusTypes = [
    {
        id:Status.ENMASSE,
        label:"En Masse"
    },
    {
        id:Status.UNITAIRE,
        label:"Unitaire"
    }
]

const Pays = [
    {
        label:"Maroc",
        id:"Maroc"
    },
    {
        label:"Hors Maroc",
        id:"Hors Maroc"
    }
]

const Cities = [
    {
        label:"Casablanca",
        id:"Casablanca",
    },
    {
        label:"Rabat",
        id:"Rabat",
    },
    {
        label:"Agadir",
        id:"Agadir",
    },
]

const formSchema = z.object({
    id_sage:z.string().min(2),
    name:z.string().min(2),
    city:z.string().min(2),
    phone:z.string().min(2),
    address:z.string().min(2),
    type:z.boolean().default(false),
    country:z.string().min(2),
    status:z.string().min(2),
    Zone:z.string().min(2)
})

type ClientFormValues=z.infer<typeof formSchema>

const ClientForm : React.FC<ClientFormProps> = ({
    initialData
}) => {
    const params = useParams()
    const router = useRouter()
    const [loading,setLoading] = useState(false)

    const title = initialData ? "Edit Client" : "Create Client"
    const description = initialData ? "Edit a Client" : "Add a Client"
    const toastMessage = initialData ? "Client updated" : "Client Created"
    const action = initialData ? "Save Changes" : "Create"


    const form = useForm<ClientFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues : initialData || {
            id_sage : '',
            name : '',
            city : '',
            country : '',
            address : '',
            status : '',
            phone:'',
            Zone:''
        }
    })

    const onSubmit=async(data:ClientFormValues)=>{
        try {
            setLoading(true)
            if(initialData){
                await axios.patch(`/api/client/${params.clientId}`,data)
            }else{
                await axios.post(`/api/client/`,data)
            }
            router.refresh()
            router.push(`/`)
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
                            name="id_sage"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Id Sage</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="ID Sage"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                            name="city"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Ville</FormLabel>
                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a City"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-white">
                                            {Cities.map((item)=>(
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
                        <FormField
                            control={form.control}
                            name="country"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Pays</FormLabel>
                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a Pays"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-white">
                                            {Pays.map((item)=>(
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
                        <FormField
                            control={form.control}
                            name="Zone"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Commercial</FormLabel>
                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a Commercial"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-white">
                                            {Comm.map((item)=>(
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
                        <FormField
                            control={form.control}
                            name="status"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a Status"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-white">
                                            {statusTypes.map((item)=>(
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
                        <FormField
                            control={form.control}
                            name="type"
                            render={({field})=>(
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox 
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="font-semibold">
                                            Type
                                        </FormLabel>
                                        <FormDescription>
                                            le type par defaut est client,si vous cochez vous etes prospect
                                        </FormDescription>
                                    </div>
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

export default ClientForm