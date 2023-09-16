import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

/*
        id    String      @id @default(uuid())
        name  String
        lname String
        type  ProfileType
*/ 
export async function POST(req:Request){
    try{
        const body = await req.json()
        const { 
            name,
            lname,
            type
        } = body

        
        // ? Create My Billboard
        const billboard = await db.profile.create({
            data:{
                name,
                lname,
                type,
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
        const billboard = await db.profile.findMany()

        console.log(billboard);

        return NextResponse.json(billboard)

    }catch(e){
        console.log("[BILLBOARDS_POST]",e);
        return new NextResponse("Internal error",{status : 500})
    }
}