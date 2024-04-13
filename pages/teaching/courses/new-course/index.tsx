import LayoutTeaching from "../../../../components/teaching/Layout";
import * as z from "zod"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
  
const NewCourse = () => {

    return (
        <LayoutTeaching>
            New Course
        </LayoutTeaching>
    );
}
 
export default NewCourse;