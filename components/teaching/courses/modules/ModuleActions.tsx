import React, { useState } from "react";
import { Button } from "../../../ui/button";
import { Trash } from "lucide-react";
import dynamic from "next/dynamic";
import axios from "axios";
import { base, version } from "../../../../lib/config-api";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const ConfirmModal = dynamic(()=> import("../../../modals/ConfirmModal"), {
    ssr: false
})

interface ChapterActionsProps {
    disabled: boolean,
    courseId: string,
    moduleId: string,
    isPublished: boolean,
}

const ChapterActions = ({ disabled, courseId, moduleId, isPublished }:ChapterActionsProps) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    console.log("ChapterActions", isPublished);
    
    const onClick = async () => {
        try {
            setIsLoading(true)
            if(isPublished){
                await axios.patch(`${base}/${version}/courses/${courseId}/modules/${moduleId}/unpublish`)
                toast.success("Módulo despublicado")
            }else{
                await axios.patch(`${base}/${version}/courses/${courseId}/modules/${moduleId}/publish`)
                toast.success("Módulo publicado")
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
            await axios.delete(`${base}/${version}/courses/${courseId}/modules/${moduleId}`)
            toast.success("Módulo excluido")
            router.replace(`/teaching/courses/${courseId}`)
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