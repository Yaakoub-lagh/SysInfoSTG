

import db from '@/lib/db'

import ContactClient from './components/client'

export default async function Home() {

    const data = await db.contact.findMany({
        include:{
            client:true
        }
    })

    return (
        <div className='h-full w-full p-6'>
        <ContactClient 
            data={data}
        />
        </div>
    )
}
