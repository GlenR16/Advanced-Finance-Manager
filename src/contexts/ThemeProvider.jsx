import { createContext,useContext,useCallback,useMemo,useState } from "react";
import { DataStore } from "../utils/StorageProvider";

const defaultTheme = {
    mode: "dark"
}
var themeObject = await DataStore.getItem("theme") || defaultTheme

const ThemeContext = createContext(themeObject);

export function useTheme() {
    const theme = useContext(ThemeContext);
    return theme;
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(themeObject);

    const editTheme = useCallback((newTheme) => {
        if (!newTheme || !newTheme.mode ){
            throw Error("Few details are missing!")
        }
        themeObject = newTheme
        DataStore.setItem("theme",themeObject)
        setTheme(themeObject);
    }, []);

    const resetTheme = useCallback(() => {
        themeObject = defaultTheme;
        DataStore.removeItem("theme")
        setTheme(defaultTheme);
    },[])

    const value = useMemo(
        () => ({theme, editTheme, resetTheme }),
        [theme, editTheme, resetTheme]
    );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}