import React, { useState } from "react";
import * as z from "zod"
import axios from "axios"
import { Button } from "../../../../ui/button"
import { ImageIcon, PlusCircle, Video } from "lucide-react";
import { base, version } from "../../../../../lib/config-api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import UploadFiles from "../../../../UploadFiles";
import MuxPlayer from "@mux/mux-player-react";
import { Chapter, MuxData } from "@prisma/client";

interface ChapterVideoFormProps {
    initialData: Chapter & { muxData?: MuxData | null }
    courseId: string
    chapterId: string
}

const formSchema = z.object({
    videoUrl: z.string().min(1)
})

const ChapterVideoForm = ({ initialData, courseId, chapterId } : ChapterVideoFormProps) => {
    const router = useRouter()

    const [isEditing, setIsEditing] = useState(false)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`${base}/${version}/courses/${courseId}/chapters/${chapterId}`, values) 
            toast.success("Video atualizado")
            toggleEdit()
            router.refresh()
        } catch (error) {
            toast.error("Aconteceu um erro inesperado");
        }
    }

    const toggleEdit = () => setIsEditing((current) => !current)

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Video do curso
                <Button className="" onClick={toggleEdit} variant={"ghost"}>
                    {isEditing && (
                        <>Cancelar</>
                    )}
                    {!isEditing && !initialData?.videoUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            Adicionar video 
                        </>
                    )}
                    {!isEditing && initialData?.videoUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            Editar video 
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                !initialData?.videoUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <Video className="h-10 w-10 text-slate-500 " />
                    </div>
                ):
                (
                    <div className="relative aspect-video mt-2">
                        <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""}  />
                    </div>
                )
            )}

            {isEditing && (
                <div className="flex flex-col items-center justify-between h-60 bg-slate-200 rounded-md ">
                    <div className="flex flex-col items-center justify-center h-full w-full">
                        <UploadFiles endpoint={"courseVideo"} onChange={(url) => { 
                            if(url){
                                onSubmit({ videoUrl: url})
                            }
                        }} />
                    </div>

                    <div className="text-xs text-muted-foreground mt-4 h-fit py-1">
                        Faça o upload do video deste modulo aqui
                    </div>
                </div>
            )}
            {initialData?.videoUrl && !isEditing && (
                <div className="textxs text-muted-foreground mt-2">
                    O video pode levar um tempo para aparecer aqui.
                    Atualize a página se necessário
                </div>
            )}
        </div>
    );
}
 
export default ChapterVideoForm;