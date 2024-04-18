import React from "react";
import LayoutTeaching from "../../../../../../components/teaching/Layout";
import { useRouter } from 'next/router'
import useModule from '../../../../../../hooks/useModule'
import { IconBadge } from "../../../../../../components/icons/BadgeIcon";
import { ArrowLeft, LayoutDashboard, ListChecks } from "lucide-react";
import ModuleTitleForm from "../../../../../../components/teaching/courses/modules/ModuleTitleForm";
import ModuleActions from "../../../../../../components/teaching/courses/modules/ModuleActions";
import ModuleDescriptionForm from "../../../../../../components/teaching/courses/modules/ModuleDescriptionForm";
import ModuleChapterForm from "../../../../../../components/teaching/courses/modules/ModuleChapterForm";
import Banner from "../../../../../../components/Banner";
import Link from "next/link";

const ModuleIdPage = () => {
    const { courseId, moduleId } = useRouter().query
    const { data: module = {} } = useModule(courseId as String, moduleId as String)
    console.log("module?.isPublished", module, module?.isPublished);
    
    const requiredFields = [
        module?.title,
        module?.description,
        module?.chapters?.some(chapter => chapter?.isPublished)
    ]

    const totalFields = requiredFields?.length
    const completedFields = requiredFields?.filter(Boolean).length

    const completionText = (`${completedFields} / ${totalFields}`)

    const isComplete = requiredFields?.every(Boolean)


    return (
        <LayoutTeaching>
            {!module?.isPublished && (
                    <Banner variant={"warning"} label="Este módulo não está publicado. Ele não ficará visível no curso!"/>
            )}
            <div className="w-full flex gap-x-2 items-center mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <Link className="flex w-fit items-center text-sm hover:opacity-75 hover:underline transition" href={`/teaching/courses/${courseId}`}>
                    Curso
                </Link>
            </div>
            <div className="flex items-center justify-between" >
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">Configurações do módulo &quot;{module?.title}&ldquo;</h1>
                    <span className="text-sm text-slate-700">Complete todos os campos {completionText}</span>   
                </div>
                <ModuleActions disabled={!isComplete} courseId={courseId as string} moduleId={moduleId as string} isPublished={module?.isPublished} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">Personalizar módulo</h2>
                    </div>
                    <ModuleTitleForm initialData={module} courseId={courseId as string} moduleId={moduleId as string} />
                    <ModuleDescriptionForm initialData={module} courseId={courseId as string} moduleId={moduleId as string} />
                </div>
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={ListChecks} />
                            <h2 className="text-x2">Personalizar aulas do curso</h2>
                        </div>
                        <ModuleChapterForm initialData={module} courseId={courseId as string} moduleId={moduleId as string} />
                    </div>                    
                </div>
            </div>
        </LayoutTeaching>
    );
}

export default ModuleIdPage;
