import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
    method: String;
}

export default async function AttachmentId(req: NextRequest, res: NextResponse) {
    const { method } : RequestBody = req;
    
    const { courseId, attachmentId } = (req as any).query;
    
    if (method === "DELETE") {
        const course = await db.course.findUnique({
            where:{
                id: courseId
            }
        })
        
        const attachment = await db.attachment.delete({
            where:{
                courseId,
                id: attachmentId 
            }
        })
        
        return res.json(attachment)
    }
    
}