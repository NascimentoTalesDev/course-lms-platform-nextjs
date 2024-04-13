import React from "react";
import LayoutTeaching from "../../../components/teaching/Layout";
import { Button } from "../../../components/ui/button";
import Link from "next/link";

const CoursesPage = () => {
    return (
        <LayoutTeaching>
            <Link href={"/teaching/courses/new-course"}>
                <Button variant="default">Novo curso</Button>
            </Link>

        </LayoutTeaching>
    );
}
 
export default CoursesPage;