import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
    method: String;
}

export default async function ChapterId(req: NextRequest, res: NextResponse) {
    const { method } : RequestBody = req;
    
    const { courseId, chapterId } = (req as any).query;
    
    if(method === "GET"){
        
        const course = await db.course.findUnique({
            where:{
                id: courseId,
            }
        })

        const chapter = await db.chapter.findUnique({
            where:{
                id: chapterId,
                courseId,
            },
            include:{
                muxData: true
            }
        })
        
        return res.json(chapter)    
    }

    if(method === "PATCH"){        
        const values = (req as any).body
        const { courseId, chapterId } = (req as any).query
        
        const course = await db.course.findUnique({
            where:{
                id: courseId,
            }
        })
        
        const chapter = await db.chapter.update({
            where: {
                id: chapterId,
                courseId
            },
            data: {
                ...values
            }
        })
        console.log(chapter);

        return res.json(chapter)    
    }
    

}