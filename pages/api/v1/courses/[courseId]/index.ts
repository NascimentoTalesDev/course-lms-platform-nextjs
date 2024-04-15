import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
    method: String;
}

export default async function CourseId(req: NextRequest, res: NextResponse) {
    const { method } : RequestBody = req;
    
    const { courseId } = (req as any).query;
    
    if(method === "GET"){
        
        const course = await db.course.findUnique({
            where:{
                id: courseId
            }
        })
        
        return res.json(course)    
    }

    if(method === "PATCH"){        
        const values = (req as any).body
        const { courseId } = (req as any).query
        
        const course = await db.course.update({
            where:{
                id: courseId
            },
            data:{
                ...values,
            }
        })
        
        
        return res.json()    
    }
    

}