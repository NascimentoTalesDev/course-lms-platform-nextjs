import React, { useState } from "react";
import { Button } from "../../../../ui/button";
import { Trash } from "lucide-react";
import dynamic from "next/dynamic";
import axios from "axios";
import { base, version } from "../../../../../lib/config-api";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const ConfirmModal = dynamic(()=> import("../../../../modals/ConfirmModal"), {
    ssr: false
})

interface ChapterActionsProps {
    disabled: boolean,
    courseId: string,
    moduleId: string,
    chapterId: string,
    isPublished: boolean,
}

const ChapterActions = ({ disabled, courseId, moduleId, chapterId, isPublished }:ChapterActionsProps) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const onClick = async () => {
        try {
            setIsLoading(true)
            if(isPublished){
                await axios.patch(`${base}/${version}/courses/${courseId}/modules/${moduleId}/chapters/${chapterId}/unpublish`)
                toast.success("Aula despublicada")
            }else{
                await axios.patch(`${base}/${version}/courses/${courseId}/modules/${moduleId}/chapters/${chapterId}/publish`)
                toast.success("Aula publicada")
            }
            router.reload()
        } catch (error) {
            toast.error("Aconteceu um erro inesperado");
        }finally{
            setIsLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true)
            await axios.delete(`${base}/${version}/courses/${courseId}/modules/${moduleId}/chapters/${chapterId}`)
            toast.success("Aula excluida")
            router.replace(`/teaching/courses/${courseId}/modules/${moduleId}`)
        } catch (error) {
            toast.error("Aconteceu um erro inesperado");
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center gap-x-2">
            <Button onClick={onClick} disabled={disabled || isLoading} variant={"outline"} size={"sm"} >
                {isPublished ? "Despublicar" : "Publicar" }
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button size={"sm"} disabled={isLoading} >
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModal>
        </div>
    );
}
 
export default ChapterActions;