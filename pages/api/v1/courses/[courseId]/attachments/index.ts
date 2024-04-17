import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
    method: String;
}

export default async function Attachments(req: NextRequest, res: NextResponse) {
    const { method } : RequestBody = req;
    
    const { courseId } = (req as any).query;
    const { url } = (req as any).body;
    
    if(method === "POST"){
        
        const courseOwner = await db.course.findUnique({
            where:{
                id: courseId,
                
            },
            include:{
                attachments: {
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        })
        
        const attachment = await db.attachment.create({
            data:{
                url,
                name: url.split("/").pop(),
                courseId,
            }
        })
        
        return res.json(attachment)    
    }

}