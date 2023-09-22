import React, { useState } from "react";
import TopBar from "../components/TopBar";
import { PageContext } from "../components/PageContext";

export default function Layout({ children }) {

    const[isOpen, setIsOpen] = useState(false);
    const[page, setPage] = useState("Home");

    return(
        <PageContext.Provider value={{page, setPage}}>
            <div className="select-none h-screen w-screen">
                <TopBar setOpen={setIsOpen}/>
                <div className="w-full h-full">
                    {children}
                </div>
            </div>
        </PageContext.Provider>
    );
}