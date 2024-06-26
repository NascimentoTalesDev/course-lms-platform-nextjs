import React from "react"
import { db } from "../../../../lib/db"
import useCourse from "../../../../hooks/useCourse"
import LayoutTeaching from "../../../../components/teaching/Layout"
import { useRouter } from "next/router"
import { IconBadge } from "../../../../components/icons/BadgeIcon"
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react"
import TitleForm from "../../../../components/teaching/courses/TitleForm"
import DescriptionForm from "../../../../components/teaching/courses/DescriptionForm"
import ImageForm from "../../../../components/teaching/courses/ImageForm"
import CategoryForm from "../../../../components/teaching/courses/CategoryForm"
import ModuleForm from "../../../../components/teaching/courses/ModuleForm"
import PriceForm from "../../../../components/teaching/courses/PriceForm"
import AttachmentForm from "../../../../components/teaching/courses/AttachmentForm"
import Actions from "../../../../components/teaching/courses/Actions"

const CourseIdPage = ({ categories }) => {
    const { courseId } = useRouter().query
    const { data: course = {} } = useCourse(courseId as String)
    console.log(course);
    
    const requiredFields = [
        course?.title,
        course?.description,
        course?.imageUrl,
        course?.price,
        course?.categoryId,
        course?.modules?.some(module => module?.isPublished),
    ]

    const totalFields = requiredFields?.length
    const completedFields = requiredFields?.filter(Boolean).length

    const completionText = (`${completedFields} / ${totalFields}`)

    const isComplete = requiredFields?.every(Boolean)

    return (
        <LayoutTeaching>
            <div className="flex items-center justify-between" >
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">Configurações do curso &quot;{course?.title}&ldquo;</h1>
                    <span className="text-sm text-slate-700">Complete todos os campos {completionText}</span>
                </div>
                <Actions disabled={!isComplete} courseId={courseId as string} isPublished={course?.isPublished} />

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl">Personalizar curso</h2>
                    </div>
                    <TitleForm initialData={course} courseId={course?.id} />
                    <DescriptionForm initialData={course} courseId={course?.id} />
                    <ImageForm initialData={course} courseId={course?.id} />
                    <CategoryForm
                        initialData={course}
                        courseId={course?.id}
                        options={categories.length > 0 && categories.map((category) => ({
                            label: category.name,
                            value: category.id,
                        }))}
                    />
                </div>
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={ListChecks} />
                            <h2 className="text-x2">Personalizar modulos do curso</h2>
                        </div>
                        <ModuleForm initialData={course} courseId={course?.id} />
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={CircleDollarSign} />
                            <h2 className="text-x2">Venda seu curso</h2>
                        </div>
                        <PriceForm initialData={course} courseId={course?.id} />
                    </div>
                    {/* <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={File} />
                            <h2 className="text-x2">Recursos e anéxos</h2>
                        </div>
                        <AttachmentForm initialData={course} courseId={course?.id} />
                    </div> */}
                </div>
            </div>
        </LayoutTeaching>
    );
}

export default CourseIdPage;

export async function getServerSideProps(req) {
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    })
    return {
        props: {
            categories: JSON.parse(JSON.stringify(categories || [])),
        }
    }
}

