import React from "react";
import { db } from "../../../../../../lib/db"
import LayoutTeaching from "../../../../../../components/teaching/Layout";
import { useRouter } from 'next/router'
import useModule from '../../../../../../hooks/useModule'
import { IconBadge } from "../../../../../../components/icons/BadgeIcon";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import TitleForm from "../../../../../../components/teaching/courses/TitleForm";
import DescriptionForm from "../../../../../../components/teaching/courses/DescriptionForm";
import ImageForm from "../../../../../../components/teaching/courses/ImageForm";
import CategoryForm from "../../../../../../components/teaching/courses/CategoryForm";
import PriceForm from "../../../../../../components/teaching/courses/PriceForm";
import AttachmentForm from "../../../../../../components/teaching/courses/AttachmentForm";
import ModuleTitleForm from "../../../../../../components/teaching/courses/modules/ModuleTitleForm";
import ModuleDescriptionForm from "../../../../../../components/teaching/courses/modules/ModuleDescriptionForm";
import ModuleChapterForm from "../../../../../../components/teaching/courses/modules/ModuleChapterForm";

const ModulesPage = () => {
    const { courseId, moduleId } = useRouter().query
    const { data: module = {} } = useModule(courseId as String, moduleId as String)

    console.log(module);
    
    const requiredFields = [
        module?.title,
        module?.description,
        module?.imageUrl,
        // module?.chapters?.some(chapter => chapter?.isPublished)
    ]

    const totalFields = requiredFields?.length
    const completedFields = requiredFields?.filter(Boolean).length

    const completionText = (`${completedFields} / ${totalFields}`)

    return (
        <LayoutTeaching>
            <div className="flex items-center justify-between" >
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">Configurações do módulo &quot;{module?.title}&ldquo;</h1>
                    <span className="text-sm text-slate-700">Complete todos os campos {completionText}</span>   
                </div>
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

export default ModulesPage;
