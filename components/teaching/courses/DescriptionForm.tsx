import React, { useState } from "react";
import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../../ui/button"
import { Textarea } from "../../ui/textarea"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../ui/form"
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { base, version } from "../../../lib/config-api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "../../../lib/utils";
import { Course } from "@prisma/client";

interface DescriptionFormProps {
    initialData: Course
    courseId: string
}

const formSchema = z.object({
    description: z.string().min(1, {
        message: "Hmm, algo está faltando! Por favor, insira uma descrição."
    })
})

const DescriptionForm = ({ initialData, courseId }: DescriptionFormProps) => {
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
            await axios.patch(`${base}/${version}/courses/${courseId}`, values)
            toast.success("Descrição atualizada")
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
                Descrição do curso
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
                <p className={cn("test-sm mt-2", !initialData?.description && "text-slate-500 italic")}>
                    {initialData?.description || "Não há descrição do curso"}
                </p>
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
                                        <Textarea
                                            disabled={isSubmitting}
                                            placeholder="Bolos caseiros da Maria"
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

export default DescriptionForm;