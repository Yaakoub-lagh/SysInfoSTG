import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {params}:{params : {letterId: string}}
){
    try {
        const body = await req.json()
        const { 
            version,
            date,
            trimestre,
            date_l,
            date_finl
    } = body

        const billboard = await db.letter.updateMany({
            where: {
                id:params.letterId,
            },
            data:{
                version,
                date,
                trimestre,
                date_l,
                date_finl
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
    {params}:{params : {storeId: string,letterId: string}}
){
    try {


        const billboard = await db.letter.deleteMany({
            where: {
                id:params.letterId,
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
    {params}:{params : {letterId: string}}
){
    try {

        const billboard = await db.letter.findUnique({
            where: {
                id:params.letterId,
            }
        })


        return NextResponse.json(billboard)

    } catch (error) {
        console.log("[BILLBOARD_GET]",error);
        return new NextResponse("Internal Server Error",{status:500})
    }
}