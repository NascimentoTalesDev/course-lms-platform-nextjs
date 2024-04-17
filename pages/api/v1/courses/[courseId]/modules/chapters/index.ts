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
        
        const lastChapter = await db.chapter.findFirst({
            where: {
                courseId
            },
            orderBy: {
                position: "desc"
            }
        })

        const newPosition = lastChapter ? lastChapter.position + 1 : 1

        const chapter = await db.chapter.create({
            data: {
                title,
                courseId,
                position: newPosition
            }
        })

        return res.json(chapter)
    }

}