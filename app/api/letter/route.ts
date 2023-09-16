import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

/*
    id        String   @id @default(uuid())
    version   String
    date      DateTime
    trimestre String
    date_l    DateTime
    date_finl DateTime
*/ 
export async function POST(req:Request){
    try{
        const body = await req.json()
        const { 
            version,
            date,
            trimestre,
            date_l,
            date_finl
        } = body

        
        // ? Create My Billboard
        const billboard = await db.letter.create({
            data:{
                version,
                date,
                trimestre,
                date_l,
                date_finl
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
        const billboard = await db.letter.findMany()

        console.log(billboard);

        return NextResponse.json(billboard)

    }catch(e){
        console.log("[BILLBOARDS_POST]",e);
        return new NextResponse("Internal error",{status : 500})
    }
}