import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
    method: String;
}

export default async function Course(req: NextRequest, res: NextResponse) {
    const { method } : RequestBody = req;
    const { title } = req.body

    if(method === "POST"){
        const course = await db.course.create({
            data: {
                userId: '123',
                title, 
            }
        })

        return res.json(course)
    }
    

    return res.json()    
}