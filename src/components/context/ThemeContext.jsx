import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [isDarkMode, setIsDarMode] = useState(false);

    const toogleTheme = () => {
        setIsDarkMode (!isDarkMode)
    }

    return (
        <ThemeContext.Provider value={{isDarkMode, toogleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}