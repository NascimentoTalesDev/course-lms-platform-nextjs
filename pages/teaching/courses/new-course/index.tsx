import LayoutTeaching from "../../../../components/teaching/Layout";
import * as z from "zod"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "../../../../components/ui/input"
import React from "react";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import toast from "react-hot-toast";
import { base, version } from "../../../../lib/config-api";
  
const formSchema = z.object({
    title: z.string().min(1, {
        message: "Hmm, algo está faltando! Por favor, insira um título."
    })
})

const NewCourse = () => {
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        }
    })

    const { isSubmitting, isValid } = form.formState
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post(`${base}/${version}/courses`, values) 
            router.push(`/teaching/courses/${response?.data?.id}`)
            toast.success("Curso criado com sucesso")
        } catch (error) {
            toast.error("Aconteceu um erro inesperado");
        }
        
    }
    return (
        <LayoutTeaching>
            <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
                <div>
                    <h1>Nome do seu curso</h1>
                    <p className="text-sm text-slate-600">Como você gostaria de nomear seu curso? Não se preocuoe, você pode alterar depois.</p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                            <FormField 
                                control={form.control} 
                                name="title" 
                                render={({ field }) => 
                                    <FormItem>
                                        <FormLabel>
                                            Titulo do curso
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                disabled={isSubmitting}
                                                placeholder="Bolos caseiros da Maria"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            O que você vai ensinar neste curso?
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                }    
                            />
                            <div className="flex items-center gap-x-2">
                                <Link href={"/teaching/courses"}>
                                    <Button type={"button"} variant={"ghost"}>Cancelar</Button>
                                </Link>
                                <Button type={"submit"} variant={"default"} disabled={!isValid || isSubmitting} >Continuar</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </LayoutTeaching>
    );
}
 
export default NewCourse;