import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Trash } from "lucide-react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { base, version } from "../../../lib/config-api";
import axios from "axios";

const ConfirmModal = dynamic(()=> import("../../modals/ConfirmModal"), {
    ssr: false
})

interface ActionsProps {
    disabled: boolean,
    courseId: string,
    isPublished: boolean,
}

const Actions = ({ disabled, courseId, isPublished }:ActionsProps) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    
    const onClick = async () => {
        try {
            setIsLoading(true)
            if(isPublished){
                await axios.patch(`${base}/${version}/courses/${courseId}/unpublish`)
                toast.success("Curso despublicado")
            }else{
                await axios.patch(`${base}/${version}/courses/${courseId}/publish`)
                toast.success("Curso publicado")
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
            await axios.delete(`${base}/${version}/courses/${courseId}`)
            toast.success("Curso excluido")
            router.replace(`/teaching/courses`)
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
 
export default Actions;