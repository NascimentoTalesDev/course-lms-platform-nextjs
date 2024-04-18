import React, { useState } from "react";
import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../../../../ui/button"
import { Textarea } from "../../../../ui/textarea"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../../../ui/form"
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { base, version } from "../../../../../lib/config-api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "../../../../../lib/utils";
import { Chapter } from "@prisma/client";
import Editor from "../../../../ui/Editor";
import Preview from "../../../../Preview";

interface ChapterDescriptionFormProps {
    initialData: Chapter
    courseId: string
    moduleId: string
    chapterId: string
}

const formSchema = z.object({
    description: z.string().min(1)
})

const ChapterDescriptionForm = ({ initialData, courseId, moduleId, chapterId }: ChapterDescriptionFormProps) => {
    const router = useRouter()

    const [isEditing, setIsEditing] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || ""
        },
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`${base}/${version}/courses/${courseId}/modules/${moduleId}/chapters/${chapterId}`, values)
            toast.success("Descrição do módulo atualizada")
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
                Descrição da aula
                <Button className="" onClick={toggleEdit} variant={"ghost"}>
                    {isEditing ? (
                        <>Cancelar</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Editar descrição
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <div className={cn("test-sm mt-2", !initialData?.description && "text-slate-500 italic")}>
                    {!initialData?.description && "Não há descrição da aula"}
                    {initialData?.description && (
                        <Preview value={initialData?.description} />
                    )}
                </div>
            )}

            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Editor
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button type="submit" disabled={!isValid || isSubmitting}>
                                Salvar
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
}

export default ChapterDescriptionForm;