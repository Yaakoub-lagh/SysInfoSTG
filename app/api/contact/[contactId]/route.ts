import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {params}:{params : {contactId: string}}
){
    try {
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

        const billboard = await db.contact.updateMany({
            where: {
                id:params.contactId,
            },
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

    } catch (error) {
        console.log("[BILLBOARD_PATCH]",error);
        return new NextResponse("Internal Server Error",{status:500})
    }
}

export async function DELETE(
    _req: Request,
    {params}:{params : {storeId: string,contactId: string}}
){
    try {


        const billboard = await db.contact.deleteMany({
            where: {
                id:params.contactId,
            }
        })


        return NextResponse.json(billboard)

    } catch (error) {
        console.log("[BILLBOARD_DELETE]",error);
        return new NextResponse("Internal Server Error",{status:500})
    }
}

export async function GET(
    _req: Request,
    {params}:{params : {contactId: string}}
){
    try {

        const billboard = await db.contact.findUnique({
            where: {
                id:params.contactId,
            }
        })


        return NextResponse.json(billboard)

    } catch (error) {
        console.log("[BILLBOARD_GET]",error);
        return new NextResponse("Internal Server Error",{status:500})
    }
}