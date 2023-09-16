

import db from '@/lib/db'

import ProfileClient from './components/client'

export default async function Home() {

    const data = await db.profile.findMany()

    return (
        <div className='h-full w-full p-6'>
        {/* <ProfileClient 
            data={data}
        /> */}
        </div>
    )
}
