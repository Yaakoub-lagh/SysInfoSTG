"use client"

import Image from 'next/image'
import {usePathname,useParams} from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'

const Navbar = () => {
    const pathname = usePathname()
    const params = useParams()

    const routes=[
        {
            href : '/',
            label:'Client',
            active:pathname === '/'
        },
        {
            href : '/contact',
            label:'Contact',
            active:pathname === '/contact'
        },
        {
            href : '/letter',
            label:'Letter',
            active:pathname === '/letter'
        },
        {
            href : '/profile',
            label:'Profile',
            active:pathname === '/profile'
        },
        {
            href : '/reserver',
            label:'Reservation',
            active:pathname === '/reserver'
        },
    ]

    return (
        <div className='bg-[#f2f2f2] flex justify-between flex-col h-full'>
            <div>
            <div className='p-6'>
                <div className='text-gray-500 font-medium text-5xl'>
                    Arte<span className='text-indigo-400'>mis</span>
                </div>
            </div>
            <div className='p-6 flex flex-col items-start gap-y-3'>
                {routes.map(route=>(
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn("text-lg font-medium transition-colors  hover:text-primary",
                        route.active ? "text-primary dark:text-white" :"text-muted-foreground")}
                    >   
                    <div>
                        {route.label}
                    </div>
                    </Link>
                ))}
            </div>
            </div>
            <div className='p-6'>
                <UserButton afterSignOutUrl='/' />
            </div>
        </div>
    )
}

export default Navbar