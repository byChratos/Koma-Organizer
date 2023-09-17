import React, { useState } from "react";
import { motion } from "framer-motion";

import Navbar from "./Navigation/Navbar";
import NavToggle from "./Navigation/NavToggle";

export default function TopBar({ setOpen }) {
    
    const[isOpen, setIsOpen] = useState(false);
    const[page, setPage] = useState("Home");

    return(
        <div className='w-full h-[84px] flex-none text-center p-2 bg-[#393E46] drop-shadow-md'>
            <h1 className="text-white font-merri text-4xl">{page}</h1>
            <p className="text-white font-merri text-xl">Koma</p>

            <NavToggle toggle={setIsOpen} isOpen={isOpen} setOpen={setOpen}/>
            <Navbar isOpen={isOpen} setPage={setPage} activePage={page} />
        </div>
    );
}