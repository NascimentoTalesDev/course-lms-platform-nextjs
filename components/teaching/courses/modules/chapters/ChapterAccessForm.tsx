import React, { useState } from "react";
import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../../../../ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "../../../../ui/form"
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { base, version } from "../../../../../lib/config-api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "../../../../../lib/utils";
import { Chapter } from "@prisma/client";
import { Checkbox } from "../../../../ui/Checkbox";

interface ChapterAccessFormProps {
    initialData: Chapter
    courseId: string
    moduleId: string
    chapterId: string
}

const formSchema = z.object({
    isFree: z.boolean().default(false)
})

const ChapterAccessForm = ({ initialData, courseId, moduleId, chapterId }: ChapterAccessFormProps) => {
    const router = useRouter()

    const [isEditing, setIsEditing] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isFree: !!initialData?.isFree
        },
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`${base}/${version}/courses/${courseId}/modules/${moduleId}/chapters/${chapterId}`, values)
            toast.success("Acesso da aula atualizado")
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
                Acesso da aula
                <Button className="" onClick={toggleEdit} variant={"ghost"}>
                    {isEditing ? (
                        <>Cancelar</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Editar acesso
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <div className={cn("test-sm mt-2", !initialData?.isFree && "text-slate-500 italic")}>
                    {initialData?.isFree ? (
                        <>Esta aula é gratuita</>
                    ):(
                        <>Esta aula não é gratuita</>
                    )}
                </div>
            )}

            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="isFree"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div>
                                        <FormDescription>
                                            Deixe marcada esta opção se quiser deixar este video como demontração
                                        </FormDescription>
                                    </div>
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

export default ChapterAccessForm;