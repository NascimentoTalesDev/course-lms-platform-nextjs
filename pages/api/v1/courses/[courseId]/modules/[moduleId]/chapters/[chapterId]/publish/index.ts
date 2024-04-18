import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
    method: String;
}

export default async function ChapterId(req: NextRequest, res: NextResponse) {
    const { method } : RequestBody = req;
    const { moduleId, chapterId } = (req as any).query;
    
    if(method === "PATCH"){        
        const { isPublished, ...values} = (req as any).body
        
        const chapter = await db.chapter.update({
            where: {
                id: chapterId,
                courseModuleId: moduleId
            },
            data: {
                ...values
            }
        })

        const muxData = await db.muxData.findUnique({
            where: {
                chapterId,
            }
        })
        
        // if(!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl ){

        // }
       
        const publishedChapter = await db.chapter.update({
            where : {
                id: chapterId,
                courseModuleId: moduleId, 
            },
            data: {
                isPublished: true,
            }
        })

        return res.json(publishedChapter)    
    }

}