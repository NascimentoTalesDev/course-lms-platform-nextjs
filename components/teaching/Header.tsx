import React, { useContext } from "react";
import dynamic from "next/dynamic"
import { Menu } from "lucide-react"
import { NavbarTeachingContext } from "../../providers/NavbarTeachingContextProvider";

const Profile = dynamic(() => import("../Profile"), {
    ssr: false
})

const HeaderTeaching = () => {
    const { toggleMenuMobile } = useContext(NavbarTeachingContext)

    return (
        <header className="flex justify-between items-center p-5 w-full border-b">
            <div onClick={toggleMenuMobile} className="md:hidden cursor-pointer"> 
                <Menu size={24} />
            </div>
            <div className="ml-auto">
                <Profile />
            </div>
        </header>
    );
}
 
export default HeaderTeaching;