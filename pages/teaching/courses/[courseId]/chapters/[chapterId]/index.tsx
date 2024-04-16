import React from "react";
import LayoutTeaching from "../../../../../../components/teaching/Layout";
import ChapterTitleForm from "../../../../../../components/teaching/courses/chapters/ChapterTitleForm";
import useChapter from "../../../../../../hooks/useChapter";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { IconBadge } from "../../../../../../components/icons/BadgeIcon";

const ChapterPage = () => {
    const { courseId, chapterId } = useRouter().query

    const { data: chapter = {} } = useChapter(courseId as String, chapterId as String)
    console.log(chapter);

    const requiredFields = [
        chapter?.title,
        chapter?.description,
        chapter?.imageUrl,
    ]

    const totalFields = requiredFields?.length
    const completedFields = requiredFields?.filter(Boolean).length

    const completionText = (`${completedFields} / ${totalFields}`)

    return (
        <LayoutTeaching>
            <div className="flex items-center justify-between ">
                <div className="w-full">
                    <Link className="flex w-fit items-center text-sm hover:opacity-75 transition mb-6" href={`/teaching/courses/${courseId}`}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar para configurações do curso
                    </Link>
                </div>
            </div>
            <div className="flex items-center justify-between" >
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">Configurações do módulo &quot;{chapter?.title}&ldquo;</h1>
                    <span className="text-sm text-slate-700">Complete todos os campos {completionText}</span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">Personalizar módulo</h2>
                    </div>
                    <ChapterTitleForm initialData={chapter} courseId={courseId as string} chapterId={chapterId as string} />
                </div>
            </div>
        </LayoutTeaching>

    );
}

export default ChapterPage;