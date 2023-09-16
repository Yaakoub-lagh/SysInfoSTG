

import db from '@/lib/db'
import {format} from 'date-fns'
import Letterclient from './components/client'
import { LetterColumn } from './components/columns'

export default async function Home() {

    const data = await db.letter.findMany()

    return (
        <div className='h-full w-full p-6'>
        <Letterclient 
            data={data}
        />
        </div>
    )
}
