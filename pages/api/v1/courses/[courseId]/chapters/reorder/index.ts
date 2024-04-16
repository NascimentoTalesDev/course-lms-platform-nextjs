import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
    method: String;
}

export default async function Reorder(req: NextRequest, res: NextResponse) {
    const { method }: RequestBody = req;

    const { courseId } = (req as any).query;
    const { list } = (req as any).body;

    if (method === "PUT") {

        const courseOwner = await db.course.findUnique({
            where: {
                id: courseId
            },
        })
        
        for(let item of list) {
            await db.chapter.update({
                where: {
                    id: item.id,
                },
                data: {
                    position: item.position
                }
            })
        }

        return res.json("Success")
    }

}