import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

/*
        id       : string
    name     : string
    lname    : string
    functions: string
    email    : string
    phone    : string
    address  : string
    client   : Client
*/ 
export async function POST(req:Request){
    try{
        const body = await req.json()
        const { 
                name,
                lname,
                functions,
                email,
                phone,
                address,
                client
        } = body

        
        // ? Create My Billboard
        const billboard = await db.contact.create({
            data:{
                name,
                lname,
                functions,
                email,
                phone,
                address,
                clientId:client
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
        const billboard = await db.contact.findMany()

        console.log(billboard);

        return NextResponse.json(billboard)

    }catch(e){
        console.log("[BILLBOARDS_POST]",e);
        return new NextResponse("Internal error",{status : 500})
    }
}