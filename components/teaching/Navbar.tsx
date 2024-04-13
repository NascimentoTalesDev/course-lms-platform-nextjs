import React, { useContext } from "react";
import Link from "next/link";
import Logo from "../logo/link";
import { usePathname } from "next/navigation";
import { BarChart, Compass, Layout, List, Settings, XIcon } from "lucide-react"
import { NavbarTeachingContext } from "../../providers/NavbarTeachingContextProvider";
import Overlay from "../Overlay";

const NavbarTeaching = () => {
    const pathname = usePathname()
    const { showMenuMobile, toggleMenuMobile } = useContext(NavbarTeachingContext)

    console.log("showMenuMobile", showMenuMobile);

    return (
        <div className={`absolute z-10 md:relative h-screen w-screen md:w-[250px] flex flex-col transition-all duration-500 ${showMenuMobile ? "-left-0 " : "-left-[100%] md:-left-0 "}`}>
            {showMenuMobile && (
                <Overlay onClick={toggleMenuMobile} />
            )}
            <nav className={`w-[250px] z-30 h-full flex bg-slate-500`}>
                <div className="w-full relative bg-white border-r">
                    <div onClick={toggleMenuMobile} className="w-fit mx-auto py-8">
                        <Logo />
                    </div>

                    <menu >
                        <ul className="flex flex-col">
                            <li>
                                <Link className={`flex text-slate-500 text-sm p-3 transition duration-500 font-bold items-center w-full gap-2 border-r-[4px] border-sky-700  ${pathname === "/teaching" ? "text-sky-900 border-opacity-100 bg-sky-200/20 hover:bg-sky-200/20 " : "border-opacity-0 hover:bg-slate-500/20 "}`} href={"/teaching/"}>
                                    <Layout size={24} />
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link className={`flex text-slate-500 text-sm p-3 transition duration-500 font-bold items-center w-full gap-2 border-r-[4px] border-sky-700  ${pathname === "/teaching/courses" ? "text-sky-900 border-opacity-100 bg-sky-200/20 hover:bg-sky-200/20 " : "border-opacity-0 hover:bg-slate-500/20 "}`} href={"/teaching/courses"}>
                                    <List size={24} />
                                    Cursos
                                </Link>
                            </li>
                            <li>
                                <Link className={`flex text-slate-500 text-sm p-3 transition duration-500 font-bold items-center w-full gap-2 border-r-[4px] border-sky-700  ${pathname === "/teaching/settings" ? "text-sky-900 border-opacity-100 bg-sky-200/20 hover:bg-sky-200/20 " : "border-opacity-0 hover:bg-slate-500/20 "}`} href={"/teaching/"}>
                                    <BarChart size={24} />
                                    Análise
                                </Link>
                            </li>
                            <li>
                                <Link className={`flex text-slate-500 text-sm p-3 transition duration-500 font-bold items-center w-full gap-2 border-r-[4px] border-sky-700  ${pathname === "/teaching/settings" ? "text-sky-900 border-opacity-100 bg-sky-200/20 hover:bg-sky-200/20 " : "border-opacity-0 hover:bg-slate-500/20 "}`} href={"/teaching/"}>
                                    <Compass size={24} />
                                    Browser
                                </Link>
                            </li>
                            <li>
                                <Link className={`flex text-slate-500 text-sm p-3 transition duration-500 font-bold items-center w-full gap-2 border-r-[4px] border-sky-700  ${pathname === "/teaching/settings" ? "text-sky-900 border-opacity-100 bg-sky-200/20 hover:bg-sky-200/20 " : "border-opacity-0 hover:bg-slate-500/20 "}`} href={"/teaching/"}>
                                    <Settings size={24} />
                                    Configurações
                                </Link>
                            </li>
                        </ul>
                    </menu>
                    <div onClick={toggleMenuMobile} className="md:hidden absolute top-0 -right-10 transition duration-300 hover:bg-slate-500 mt-8 ml-4 h-fit w-fit bg-slate-500/70 cursor-pointer text-slate-300 rounded-full">
                        <XIcon size={24} />
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavbarTeaching;