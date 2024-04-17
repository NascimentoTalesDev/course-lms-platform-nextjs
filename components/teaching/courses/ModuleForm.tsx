import React, { useState } from "react";
import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../../ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../ui/form"
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { base, version } from "../../../lib/config-api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "../../../lib/utils";
import { Course, CourseModule } from "@prisma/client";
import { Input } from "../../ui/input";
import ModuleList from "./ModuleList";

interface ModuleFormProps {
    initialData: Course & { modules: CourseModule[] }
    courseId: string
}

const formSchema = z.object({
    title: z.string().min(1)
})

const ModuleForm = ({ initialData, courseId }: ModuleFormProps) => {
    const router = useRouter()

    const [isCreating, setIsCreating] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    
    const toggleCreating = () => {
        setIsCreating((current) => !current)
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`${base}/${version}/courses/${courseId}/modules`, values)
            toast.success("Módulo criado")
            toggleCreating()
            router.refresh()
        } catch (error) {
            toast.error("Aconteceu um erro inesperado");
        }
    }

    const onReorder = async ( updateData: { id: string, position: number } ) => {
        try {
            setIsUpdating(true)
            await axios.put(`${base}/${version}/courses/${courseId}/modules/reorder`, { list: updateData })
            toast.success("Módulos reordenados")
        } catch (error) {
            toast.error("Aconteceu um erro inesperado");
        }finally{
            setIsUpdating(false)
        }
    }

    const onEdit = async (id: string) => {
        router.push(`/teaching/courses/${courseId}/modules/${id}`)
    }

    return (
        <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
            {isUpdating && (
                <div className="absolute w-full h-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
                    <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
                </div>
            )}
            <div className="font-medium flex items-center justify-between">
                Módulos do curso
                <Button className="" onClick={toggleCreating} variant={"ghost"}>
                    {isCreating ? (
                        <>Cancelar</>
                    ) : (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Adicionar módulos
                        </>
                    )}
                </Button>
            </div>
            {isCreating && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="Introdução para bolos caseiros da Maria"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button type="submit" disabled={!isValid || isSubmitting}>
                                Criar
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
            {!isCreating && (
                <div className={cn("text-sm", !initialData?.modules?.length && "text-slate-500 italic")}>
                    { !initialData?.modules?.length && "Nenhum módulo criado" } 
                    <ModuleList onEdit={onEdit} onReorder={onReorder} items={initialData?.modules || []}  />
                </div>
            )}
            {!isCreating && (
                <p className="text-sm text-muted-foreground mt-4">
                    Araste e solte para reordenar os módulos 
                </p>
            )}
        </div>
    );
}

export default ModuleForm;