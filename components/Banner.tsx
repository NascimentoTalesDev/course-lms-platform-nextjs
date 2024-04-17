import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { AlertTriangle, CheckCircle } from "lucide-react";
import React from "react";

const bannerVariants = cva(
    "border mb-4 flex text-center p-4 text-sm justify-center items-center w-full",
    {
        variants : {
            variant: {
                warning: "bg-yellow-200/80 border-yellow-30 text-primary",
                success: "bg-emerald-700 border-emerald-800 text-secondary"
            }
        },
        defaultVariants: {
            variant: "warning"
        }
    }
)

interface BannerProps extends VariantProps<typeof bannerVariants>{
    label: string
}

const iconMap = {
    warning: AlertTriangle,
    success: CheckCircle
}

const Banner = ({ label, variant }:BannerProps) => {
    
    const Icon = iconMap[variant || "warning"]

    return (
        <div className={cn(bannerVariants({variant}))}>
            <Icon className="h-4 w-4 mr-4 " />
            {label}
        </div>
    );
}
 
export default Banner;