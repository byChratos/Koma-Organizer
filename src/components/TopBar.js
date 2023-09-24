import React, { useState, useContext } from "react";

import Navbar from "./Navigation/Navbar";
import NavToggle from "./Navigation/NavToggle";
import logoDark from "../Images/Koma_Koma White.png";
import logoLight from "../Images/Koma_Koma Black.png";
import { PageContext } from "./PageContext";

export default function TopBar({ setOpen }) {

    const[isOpen, setIsOpen] = useState(false);
    const {
        page,
        setPage,
        theme
    } = useContext(PageContext);

    return(
        <div className='w-full h-[84px] flex-none flex items-center justify-center text-center p-2 bg-lightBGTwo dark:bg-darkBGTwo drop-shadow-md'>
            {(page === "Home") ? <></> : (theme === 'dark') ? <img src={logoDark} alt="logo" height="68" width="282"/> : <img src={logoLight} alt="logo" height="68" width="282"/>}

            <NavToggle toggle={setIsOpen} isOpen={isOpen} setOpen={setOpen}/>
            <Navbar isOpen={isOpen} setPage={setPage} activePage={page} />
        </div>
    );
}