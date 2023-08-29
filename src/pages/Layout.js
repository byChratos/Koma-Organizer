import React, { useState } from "react";

import TopBar from "../components/TopBar";
import NavDrop from "../components/Navigation/NavDrop";

export default function Layout({ children }) {

    const[isOpen, setIsOpen] = useState(false);

    return(
        <div className="select-none">
            <TopBar setOpen={setIsOpen}/>
            <div>
                <NavDrop isOpen={isOpen} setIsOpen={setIsOpen} />
                {children}
            </div>
        </div>
    );
}