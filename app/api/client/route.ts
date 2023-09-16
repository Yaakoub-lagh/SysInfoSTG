import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

/*
    id_sage:z.string().min(2),
    name:z.string().min(2),
    city:z.string().min(2),
    phone:z.string().min(2),
    address:z.string().min(2),
    type:z.boolean().default(false),
    letter_nbr:z.number(),
    country:z.string().min(2),
    status:z.string().min(2),
    Zone:z.string().min(2).default("Zone 1")
*/
export async function POST(req:Request){
    try{
        const body = await req.json()
        const { id_sage,
                name,
                city,
                phone,
                address,
                type,
                country,
                status,
                Zone
        } = body

        const letter_nbr=0

        // ? Create My Billboard
        const billboard = await db.client.create({
            data:{
                id_sage,
                name,
                city,
                phone,
                address,
                type,
                letter_nbr,
                country,
                status,
                Zone
            }
        })

        return NextResponse.json(billboard)

    }catch(e){
        console.log("[BILLBOARDS_POST]",e);
        return new NextResponse("Internal error",{status : 500})
    }
}


export async function GET(req:Request,{params}:{params : {clientId:string}}){
    try{


        // ? GET All the Billboards
        const billboard = await db.client.findMany()

        console.log(billboard);

        return NextResponse.json(billboard)

    }catch(e){
        console.log("[BILLBOARDS_POST]",e);
        return new NextResponse("Internal error",{status : 500})
    }
}