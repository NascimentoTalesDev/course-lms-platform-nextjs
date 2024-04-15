import React, { useState } from "react";
import * as z from "zod"
import axios from "axios"
import { Button } from "../../ui/button"
import { ImageIcon, PlusCircle } from "lucide-react";
import { base, version } from "../../../lib/config-api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import UploadFiles from "../../UploadFiles";
import Image from "next/image";

interface ImageFormProps {
    initialData: {
        imageUrl: string
    },
    courseId: string
}

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Hmm, algo está faltando! Por favor, insira uma imagem."
    })
})

const ImageForm = ({ initialData, courseId } : ImageFormProps) => {
    const router = useRouter()

    const [isEditing, setIsEditing] = useState(false)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`${base}/${version}/courses/${courseId}`, values) 
            toast.success("Imagem atualizada")
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
                Imagem do curso
                <Button className="" onClick={toggleEdit} variant={"ghost"}>
                    {isEditing && (
                        <>Cancelar</>
                    )}
                    {!isEditing && !initialData?.imageUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            Adicionar imagem 
                        </>
                    )}
                    {!isEditing && initialData?.imageUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            Editar imagem 
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                !initialData?.imageUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500 " />
                    </div>
                ):
                (
                    <div className="relative aspect-video mt-2">
                        <Image alt="Upload" fill className="object-cover rounded-md" src={initialData?.imageUrl} />
                    </div>
                )
            )}

            {isEditing && (
                <div className="flex flex-col items-center justify-between h-60 bg-slate-200 rounded-md ">
                    <div className="flex flex-col items-center justify-center h-full w-full">

                        <UploadFiles endpoint={"courseImage"} onChange={(url) => { 
                            if(url){
                                onSubmit({ imageUrl: url})
                            }
                        }} />
                    </div>

                    <div className="text-xs text-muted-foreground mt-4 h-fit py-1">
                        16:9 formato recomendado
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default ImageForm;