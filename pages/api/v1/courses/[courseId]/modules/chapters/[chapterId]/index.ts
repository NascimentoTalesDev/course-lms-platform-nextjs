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
    
    const { courseId, chapterId } = (req as any).query;
    
    if(method === "GET"){
        
        const course = await db.course.findUnique({
            where:{
                id: courseId,
            }
        })

        const chapter = await db.chapter.findUnique({
            where:{
                id: chapterId,
                courseId,
            },
            include:{
                muxData: true
            }
        })
        
        return res.json(chapter)    
    }

    if(method === "PATCH"){        
        const { isPublished, ...values} = (req as any).body
        const { courseId, chapterId } = (req as any).query
        
        const course = await db.course.findUnique({
            where:{
                id: courseId,
            }
        })
        
        const chapter = await db.chapter.update({
            where: {
                id: chapterId,
                courseId
            },
            data: {
                ...values
            }
        })
        
        if(values.videoUrl){
            const existingMuxData = await db.muxData.findFirst({
                where: {
                    chapterId
                }
            })

            if(existingMuxData) {
                await video.assets.delete(existingMuxData.assetId)
                await db.muxData.delete({
                    where: {
                        id: existingMuxData.id
                    }
                })
            }

            const asset = await video.assets.create({
                input: values.videoUrl,
                playback_policy: ["public"],
                test: false,
            })

            await db.muxData.create({
                data: {
                    chapterId,
                    assetId: asset.id,
                    playbackId: asset.playback_ids?.[0]?.id
                }
            })
        }

        

        return res.json(chapter)    
    }
}