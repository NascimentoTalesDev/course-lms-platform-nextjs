import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
    method: String;
}

export default async function Attachments(req: NextRequest, res: NextResponse) {
    const { method }: RequestBody = req;

    const { courseId, moduleId } = (req as any).query;
    const { title } = (req as any).body;
    
    if (method === "POST") {

        const courseOwner = await db.course.findUnique({
            where: {
                id: courseId,
            }
        })      
        
        const courseModuleOwner = await db.courseModule.findUnique({
            where: {
                id: moduleId,
                courseId
            },
            include: {
                chapters:{
                    orderBy : {
                        position: "asc"
                    }
                }
            }
        })

        const lastChapter = await db.chapter.findFirst({
            where: {
                courseModuleId: moduleId
            },
            orderBy: {
                position: "desc"
            }
        })
        
        const newPosition = lastChapter ? lastChapter.position + 1 : 1 

        const chapter = await db.chapter.create({
            data: {
                title,
                courseModuleId: moduleId,
                position: newPosition
            }
        })
        console.log(chapter);
        console.log("courseModuleOwner", courseModuleOwner );

        return res.json(chapter)
    }

}