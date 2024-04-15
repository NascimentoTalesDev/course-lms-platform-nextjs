import React from "react";
import { db } from  "../../../../lib/db"
import LayoutTeaching from "../../../../components/teaching/Layout";
import { useRouter } from 'next/router'
import useCourse from '../../../../hooks/useCourse'
import { IconBadge } from "../../../../components/icons/BadgeIcon";
import { LayoutDashboard } from "lucide-react";
import TitleForm from "../../../../components/teaching/courses/TitleForm";
import DescriptionForm from "../../../../components/teaching/courses/DescriptionForm";
import ImageForm from "../../../../components/teaching/courses/ImageForm";
// import { Combobox } from "../../../../components/ComboBox";

// const CourseIdPage = ({ categories }) => {
const CourseIdPage = () => {
    const { courseId } = useRouter().query
    const { data: course = {} } = useCourse(courseId as String)
        
    const requiredFields = [
        course?.title,
        course?.description,
        course?.imageUrl,
        course?.price,
        course?.categoryId,
    ]

    const totalFields = requiredFields?.length 
    const completedFields = requiredFields?.filter(Boolean).length
    
    const completionText = (`${completedFields} / ${totalFields}`)

    return (
        <LayoutTeaching>
            <div className="flex items-center justify-between" >
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">Configurações do curso &quot;{course?.title}&ldquo;</h1>
                    <span className="text-sm text-slate-700">Compete todos os campos {completionText}</span>
                </div>
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
                    {/* <Combobox options={categories} onChange={()=> {}} value="" /> */}
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
    console.log(categories);
    return {
        props: {
            categories: JSON.parse(JSON.stringify(categories)),
        }
    }

}

