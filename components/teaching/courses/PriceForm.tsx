import React, { useState } from "react";
import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../../ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../ui/form"
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { base, version } from "../../../lib/config-api";
import formatLocalCurrency from "../../../lib/format-local-currency";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "../../../lib/utils";
import { Course } from "@prisma/client";
import { Input } from "../../ui/input";

interface PriceFormProps {
    initialData: Course
    courseId: string
}

const formSchema = z.object({
    price: z.coerce.number()
})

const PriceForm = ({ initialData, courseId }: PriceFormProps) => {
    const router = useRouter()

    const [isEditing, setIsEditing] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: initialData?.price || undefined
        },
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`${base}/${version}/courses/${courseId}`, values)
            toast.success("Preço atualizado")
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
                Preço do curso
                <Button className="" onClick={toggleEdit} variant={"ghost"}>
                    {isEditing ? (
                        <>Cancelar</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Editar preço
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn("test-sm mt-2", !initialData?.price && "text-slate-500 italic")}>
                    {initialData?.price ? `R$${formatLocalCurrency(initialData?.price)}`  : "Não há preço do curso"}
                </p>
            )}

            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            type="number"
                                            step={"0.01"}
                                            placeholder="insira aqui o preço"
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

export default PriceForm;