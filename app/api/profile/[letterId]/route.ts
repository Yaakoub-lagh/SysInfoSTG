import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {params}:{params : {profileId: string}}
){
    try {
        const body = await req.json()
        const { 
            name,
            lname,
            type
    } = body

        const billboard = await db.profile.updateMany({
            where: {
                id:params.profileId,
            },
            data:{
                name,
                lname,
                type
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
    {params}:{params : {storeId: string,profileId: string}}
){
    try {


        const billboard = await db.profile.deleteMany({
            where: {
                id:params.profileId,
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
    {params}:{params : {profileId: string}}
){
    try {

        const billboard = await db.profile.findUnique({
            where: {
                id:params.profileId,
            }
        })


        return NextResponse.json(billboard)

    } catch (error) {
        console.log("[BILLBOARD_GET]",error);
        return new NextResponse("Internal Server Error",{status:500})
    }
}