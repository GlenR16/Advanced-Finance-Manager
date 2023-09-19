import { Outlet } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import { useTheme } from "../contexts/ThemeProvider";
import BottomFooter from "../components/BottomFooter";

export default function Wrapper(){
    const { theme } = useTheme();
    
    if (theme.mode === "dark") {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
    
    return (
        <>
            <TopNavbar />
            <Outlet />
            <BottomFooter />
        </>
    );
}