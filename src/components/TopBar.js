import React, { useState, useContext } from "react";

import Navbar from "./Navigation/Navbar";
import NavToggle from "./Navigation/NavToggle";
import logo from "../Images/Koma_Koma White.png";
import { PageContext } from "./PageContext";

export default function TopBar({ setOpen }) {
    
    //const currentPage = useContext(PageContext);

    const[isOpen, setIsOpen] = useState(false);
    //const[page, setPage] = useState(currentPage);
    const {
        page,
        setPage
    } = useContext(PageContext);

    return(
        <div className='w-full h-[84px] flex-none flex items-center justify-center text-center p-2 bg-[#393E46] drop-shadow-md'>
            {(page === "Home") ? <></> : <img src={logo} alt="logo" height="68" width="282"/>}

            <NavToggle toggle={setIsOpen} isOpen={isOpen} setOpen={setOpen}/>
            <Navbar isOpen={isOpen} setPage={setPage} activePage={page} />
        </div>
    );
}