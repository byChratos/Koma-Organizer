import React, { useContext } from "react";
import { motion } from "framer-motion";

import MenuButton from "./MenuButton";
import { PageContext } from "../PageContext";

const navVar = {
    hover: {
        scale: 1.3,
        transition: {
            type: "spring",
            duration: 0.3,
        }
    },
    tap: {
        scale: 1.15,
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 15,
            duration: 0.1,
        }
    }
}

export default function NavToggle({ toggle, isOpen, setOpen }) {

    function toggleNav(){
        toggle(!isOpen);
        setOpen(!isOpen);
    }

    const {
        theme
    } = useContext(PageContext);

    return(
        <motion.div
            className={`w-[50px] h-[50px] cursor-pointer absolute top-4 left-4 items-center content-center z-20 rounded-lg ${isOpen ? 'hover:bg-lightSecondary dark:hover:bg-darkSecondary' : 'hover:bg-[#9c9cf1] dark:hover:bg-[#212327]'}`}
            variants={navVar}
            onClick={() => toggleNav()}
        >
            <MenuButton 
                isOpen={isOpen}
                onClick={() => toggleNav()}
                strokeWidth="5"
                color={theme === 'dark' ? "#ffffff" : "#ffffff"}
                lineProps={{ strokeLinecap: "round" }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                width="30"
                height="30"
                className="mt-[10px] ml-[10px]"
            />
        </motion.div>
    );
}