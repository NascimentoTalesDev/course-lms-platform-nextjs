import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
    method: String;
}

export default async function Attachments(req: NextRequest, res: NextResponse) {
    const { method }: RequestBody = req;

    const { courseId } = (req as any).query;
    const { title } = (req as any).body;

    if (method === "POST") {

        const courseOwner = await db.course.findUnique({
            where: {
                id: courseId
            },
        })
        
        const lastModule = await db.courseModule.findFirst({
            where: {
                courseId
            },
            orderBy: {
                position: "desc"
            }
        })

        const newPosition = lastModule ? lastModule.position + 1 : 1

        const course_module = await db.courseModule.create({
            data: {
                title,
                courseId,
                position: newPosition
            }
        })

        return res.json(course_module)
    }

}