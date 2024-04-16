import React, { useState } from "react";
import * as z from "zod"
import axios from "axios"
import { Button } from "../../ui/button"
import { File, ImageIcon, Loader2, PlusCircle, X } from "lucide-react";
import { base, version } from "../../../lib/config-api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import UploadFiles from "../../UploadFiles";
import { Attachment, Course } from "@prisma/client";

interface AttachmentFormProps {
    initialData: Course & { attachments: Attachment }
    courseId: string
}

const formSchema = z.object({
    url: z.string().min(1)
})

const AttachmentForm = ({ initialData, courseId } : AttachmentFormProps) => {
    const router = useRouter()

    const [isEditing, setIsEditing] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`${base}/${version}/courses/${courseId}/attachments`, values) 
            toggleEdit()
            toast.success("Documento adicionado")
            router.refresh()
        } catch (error) {
            toast.error("Aconteceu um erro inesperado");
        }
    }

    const toggleEdit = () => setIsEditing((current) => !current)

    const onDelete = async (id: string) => {        
        try {
            setDeletingId(id)
            await axios.delete(`${base}/${version}/courses/${courseId}/attachments/${id}`) 
            toast.success("Documento excluido")
            router.refresh()
        } catch (error) {
            toast.error("Aconteceu um erro inesperado");
        }finally{
            setDeletingId(null)
        }
    } 

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Arquivos do curso
                <Button className="" onClick={toggleEdit} variant={"ghost"}>
                    {isEditing && (
                        <>Cancelar</>
                    )}
                    {!isEditing && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            Adicionar arquivo 
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <>
                    {initialData?.attachments?.length === 0 && (
                        <p className="text-sm text-slate-500 italic">
                            Nemhum anéxo ainda
                        </p>
                    )}
                    {initialData?.attachments?.length > 0 &&(
                        <div className="space-y-2">
                            {initialData?.attachments.map(attachment => (
                                <div key={attachment.id} className="flex items-center justify-between p3 w-full border border-sky-200 text-sky-700">
                                    <div className="flex items-center">
                                        <File className="h-4 w-4 mr-2 flex-shrink" />
                                        <p className="text-sm line-clamp-1">
                                            {attachment?.name}
                                        </p>
                                    </div>
                                    {deletingId === attachment.id  && (
                                        <div>
                                            <Loader2 className="w-4 h-4 animate-spin"/>
                                        </div>
                                    )}
                                    {deletingId !== attachment.id && (
                                        <button onClick={() => onDelete(attachment.id)} className="ml-auto hover:opacity-75 transition">
                                            <X className="w-4 h-4"/>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {isEditing && (
                <div className="flex flex-col items-center justify-between h-60 bg-slate-200 rounded-md ">
                    <div className="flex flex-col items-center justify-center h-full w-full">

                        <UploadFiles endpoint={"courseAttachment"} onChange={(url) => { 
                            if(url){
                                onSubmit({ url: url})
                            }
                        }} />
                    </div>

                    <div className="text-xs text-muted-foreground mt-4 h-fit py-1">
                        Adicione tudo o que os seis alunos possam precisar para comcluir o curso.
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default AttachmentForm;