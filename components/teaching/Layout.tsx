import React from "react";
import NavbarTeaching from "./Navbar";
import HeaderTeaching from "./Header";
import NavbarTeachingContextProvider from "../../providers/NavbarTeachingContextProvider";

interface LayoutTeachingProps {
    children: React.ReactNode
}

const LayoutTeaching = ({ children }: LayoutTeachingProps) => {
    
    return (
        <NavbarTeachingContextProvider>
            <div className="max-h-screen flex h-screen">
                <NavbarTeaching />

                <div className="flex flex-col w-full">
                    <HeaderTeaching />
                    <main className="overflow-y-auto p-5">
                        {children}
                    </main>
                </div>
            </div>
        </NavbarTeachingContextProvider>
    );
}
 
export default LayoutTeaching;