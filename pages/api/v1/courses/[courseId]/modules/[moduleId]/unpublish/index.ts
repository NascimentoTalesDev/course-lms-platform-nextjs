import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
    method: String;
}

export default async function ChapterId(req: NextRequest, res: NextResponse) {
    const { method } : RequestBody = req;
    const { courseId, moduleId } = (req as any).query;
    
    if(method === "PATCH"){        
        const { isPublished, ...values} = (req as any).body
       
        const publishedModule = await db.courseModule.update({
            where : {
                id: moduleId,
                courseId, 
            },
            data: {
                isPublished: false,
            }
        })

        return res.json(publishedModule)    
    }

}