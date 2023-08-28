import React, { useState } from "react";
import { motion } from "framer-motion";

import Navbar from "./Navigation/Navbar";
import NavToggle from "./Navigation/NavToggle";

export default function TopBar() {
    
    const[isOpen, setIsOpen] = useState(false);
    const[page, setPage] = useState("Home");

    return(
        <div className='w-full flex-none text-center p-2 bg-[#42413F] drop-shadow-md'>
            <h1 className="text-white font-merri text-4xl">{page}</h1>
            <p className="text-white font-merri text-xl">Organize or smth</p>

            <NavToggle toggle={setIsOpen} isOpen={isOpen} />
            <Navbar isOpen={isOpen} setPage={setPage}/>
        </div>
    );
}