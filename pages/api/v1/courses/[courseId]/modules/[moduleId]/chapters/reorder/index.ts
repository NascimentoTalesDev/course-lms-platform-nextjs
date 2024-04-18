import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
    method: String;
}

export default async function Reorder(req: NextRequest, res: NextResponse) {
    const { method }: RequestBody = req;

    const { courseId, moduleId } = (req as any).query;
    const { list } = (req as any).body;

    console.log("list", list);


    if (method === "PUT") {

        const courseOwner = await db.course.findUnique({
            where: {
                id: courseId
            },
        })

        const course_module = await db.courseModule.findUnique({
            where: {
                id: moduleId
            },
            include: {
                chapters: {
                    orderBy: {
                        position: "desc"
                    }
                }
            }
        })


        for (let item of list) {

            let chap = await db.chapter.update({
                where: {
                    id: item.id,
                    courseModuleId: moduleId
                },
                data: {
                    position: item.position,
                }
            })
            console.log("chap", chap);
        }



        return res.json("Success")
    }

}