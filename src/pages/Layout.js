import React, { useState } from "react";

import TopBar from "../components/TopBar";
import NavDrop from "../components/Navigation/NavDrop";

export default function Layout({ children }) {

    const[isOpen, setIsOpen] = useState(false);

    return(
        <div className="select-none h-screen w-screen">
            <TopBar setOpen={setIsOpen}/>
            <div className="w-full h-full">
                {/* <NavDrop isOpen={isOpen} setIsOpen={setIsOpen} /> */}
                {children}
            </div>
        </div>
    );
}