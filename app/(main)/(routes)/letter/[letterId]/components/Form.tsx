"use client"


import * as z from "zod"
import Heading from "@/components/Heading"
import { Button } from "@/components/ui/button"
import { Client, Contact, Letter, Status } from "@prisma/client"
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
import { DatePickerDemo } from "@/components/DatePicker"

interface LetterFormProps{
    initialData:Letter | null
}

const Tris = [
    {
        id:"Tri1",
        label:"Tri1"
    },
    {
        id:"Tri2",
        label:"Tri2"
    },
    {
        id:"Tri3",
        label:"Tri3"
    },
]

/*
  id        String   @id @default(uuid())
  version   String
  date      DateTime
  trimestre String
  date_l    DateTime
  date_finl DateTime
*/ 

const formSchema = z.object({
    version:z.string().min(2),
    date:z.string().min(2),
    trimestre:z.string().min(2),
    date_l:z.string().min(2),
    date_finl:z.string().min(2),
})

type LetterFormValues=z.infer<typeof formSchema>

const LetterForm : React.FC<LetterFormProps> = ({
    initialData
}) => {
    const params = useParams()
    const router = useRouter()
    const [loading,setLoading] = useState(false)

    const title = initialData ? "Edit Lettre" : "Create Lettre"
    const description = initialData ? "Edit a Lettre" : "Add a Lettre"
    const toastMessage = initialData ? "Lettre updated" : "Lettre Created"
    const action = initialData ? "Save Changes" : "Create"


    const form = useForm<LetterFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues : initialData || {
            version : '',
            trimestre:'',
            date:'',
            date_finl:'',
            date_l:'',
        }
    })

    const onSubmit=async(data:LetterFormValues)=>{
        try {
            setLoading(true)
            if(initialData){
                await axios.patch(`/api/letter/${params.letterId}`,data)
            }else{
                await axios.post(`/api/letter/`,data)
            }
            router.refresh()
            router.push(`/letter`)
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
                            name="version"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Version</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Version"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                                                <FormField
                            control={form.control}
                            name="date"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Date</FormLabel>
                                    <FormControl>
                                        <Input
                                        type="date"
                                            disabled={loading}
                                            placeholder="Version"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                                                <FormField
                            control={form.control}
                            name="date_l"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Date Livraison</FormLabel>
                                    <FormControl>
                                        <Input
                                        type="date"
                                            disabled={loading}
                                            placeholder="Version"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                                                <FormField
                            control={form.control}
                            name="date_finl"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Date fin Livraison</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            disabled={loading}
                                            placeholder="Version"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="trimestre"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Trimestre</FormLabel>
                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a Trimestre"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-white">
                                            {Tris.map((item)=>(
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

export default LetterForm