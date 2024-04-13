import React, { createContext, useState } from "react";
export const NavContext = createContext({})

const NavContextProvider = ({ children }) => {
    const [showMenuMobile, setShowMenuMobile] = useState(false)
    console.log("FORA");

    const toggleMenuMobile = () => {
        console.log("CLICOU");
        
        setShowMenuMobile(!showMenuMobile);
    }

    return (
        <NavContext.Provider value={{ showMenuMobile, toggleMenuMobile }}>
            {children}
        </NavContext.Provider>
    )
}

export default NavContextProvider;