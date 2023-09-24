import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import { PageContext } from "../components/PageContext";

export default function Layout({ children }) {

    useEffect(() => {
        loadMode();
    }, []);

    async function loadMode(){
        const config = await window.api.storeGet({ item: "config" });
        setTheme(config["theme"]);
    }

    const[isOpen, setIsOpen] = useState(false);
    const[page, setPage] = useState("Home");
    const[theme, setTheme] = useState("dark");

    return(
        <PageContext.Provider value={{page, setPage, theme, setTheme}}>
            <div className={`select-none h-screen w-screen ${theme === "dark" ? 'dark': ''}`}>
                <TopBar setOpen={setIsOpen}/>
                <div className="w-full h-full bg-lightBG dark:bg-darkBG">
                    {children}
                </div>
            </div>
        </PageContext.Provider>
    );
}