

import ProfileClient from './components/client'
import { boolean } from 'zod'

export default async function Home() {

    const data=[
        {
        id:'1',
        name:'John',
        cname:"doe",
        address:"Adresss :D",
        city:'San Francisco',
        version:"1.2",
        status:true
    },
    {
        id:'1',
        name:'John',
        cname:"doe",
        address:"Adresss :D",
        city:'San Francisco',
        version:"1.2",
        status:false
    },
    {
        id:'1',
        name:'John',
        cname:"doe",
        address:"Adresss :D",
        city:'San Francisco',
        version:"1.2",
        status:false
    },
    {
        id:'1',
        name:'John',
        cname:"doe",
        address:"Adresss :D",
        city:'San Francisco',
        version:"1.2",
        status:false
    },
    {
        id:'1',
        name:'John',
        cname:"doe",
        address:"Adresss :D",
        city:'San Francisco',
        version:"1.2",
        status:false
    },
    {
        id:'1',
        name:'John',
        cname:"doe",
        address:"Adresss :D",
        city:'San Francisco',
        version:"1.2",
        status:false
    },
    {
        id:'1',
        name:'John',
        cname:"doe",
        address:"Adresss :D",
        city:'San Francisco',
        version:"1.2",
        status:false
    },
    {
        id:'1',
        name:'John',
        cname:"doe",
        address:"Adresss :D",
        city:'San Francisco',
        version:"1.2",
        status:false
    },
    
    ]

    return (
        <div className='h-full w-full p-6'>
        <ProfileClient  data={data}/>
        </div>
    )
}
