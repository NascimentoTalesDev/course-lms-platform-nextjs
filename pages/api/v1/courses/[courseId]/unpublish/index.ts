import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
    method: String;
}

export default async function UnpublishCourseID(req: NextRequest, res: NextResponse) {
    const { method } : RequestBody = req;
    const { courseId } = (req as any).query;
    
    if(method === "PATCH"){        
       
        const unpublishedCourse = await db.course.update({
            where : {
                id: courseId,
            },
            data: {
                isPublished: false,
            }
        })

        return res.json(unpublishedCourse)    
    }
}