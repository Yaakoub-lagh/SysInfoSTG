import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {params}:{params : {storeId: string,clientId: string}}
){
    try {
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

        const billboard = await db.client.updateMany({
            where: {
                id:params.clientId,
            },
            data:{
                id_sage,
                name,
                city,
                phone,
                address,
                type,
                country,
                status,
                Zone
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
    {params}:{params : {storeId: string,clientId: string}}
){
    try {


        const billboard = await db.client.deleteMany({
            where: {
                id:params.clientId,
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
    {params}:{params : {clientId: string}}
){
    try {

        const billboard = await db.client.findUnique({
            where: {
                id:params.clientId,
            }
        })


        return NextResponse.json(billboard)

    } catch (error) {
        console.log("[BILLBOARD_GET]",error);
        return new NextResponse("Internal Server Error",{status:500})
    }
}