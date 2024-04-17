import Mux from "@mux/mux-node"
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
interface RequestBody {
    method: String;
}

const { video } = new Mux( 
    process.env.MUX_TOKEN_ID!,
    process.env.MUX_SECRET_ID!,
)

export default async function ChapterId(req: NextRequest, res: NextResponse) {
    const { method } : RequestBody = req;
    
    const { courseId, moduleId } = (req as any).query;
    
    if(method === "GET"){
        
        const course = await db.course.findUnique({
            where:{
                id: courseId,
            }
        })

        const course_module = await db.courseModule.findUnique({
            where:{
                id: moduleId,
                courseId
            }
            
        })
        
        return res.json(course_module)    
    }

    if(method === "PATCH"){        
        const values = (req as any).body
        const { courseId, moduleId } = (req as any).query
        
        const course = await db.course.findUnique({
            where:{
                id: courseId,
            }
        })
        
        const course_module = await db.courseModule.update({
            where: {
                id: moduleId,
                courseId
            },
            data: {
                ...values
            }
        })
        
        return res.json(course_module)    
    }
}