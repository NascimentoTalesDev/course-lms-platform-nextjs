import React, { createContext, useState } from "react";
export const NavbarTeachingContext = createContext({})

const NavbarTeachingContextProvider = ({ children }) => {
    const [showMenuMobile, setShowMenuMobile] = useState(false)
    
    const toggleMenuMobile = () => {        
        setShowMenuMobile(!showMenuMobile);
    }

    return (
        <NavbarTeachingContext.Provider value={{ showMenuMobile, toggleMenuMobile }}>
            {children}
        </NavbarTeachingContext.Provider>
    )
}

export default NavbarTeachingContextProvider;