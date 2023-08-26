import React, { useState } from "react";
import { motion } from "framer-motion";

import MenuButton from "./MenuButton";

const navVar = {
    hover: {
        scale: 1.3,
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 15,
            duration: 0.1,
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

export default function NavToggle({ toggle, isOpen }) {

    //! TODO HEADER AS NAVBAR!!!!

    return(
        <motion.div
            className="w-[50px] h-[50px] cursor-pointer absolute bg-[#4686c2] top-4 left-4 rounded-lg items-center content-center z-20"
            whileHover="hover"
            whileTap="tap"
            variants={navVar}
            onClick={() => toggle(!isOpen)}
        >
            <MenuButton 
                isOpen={isOpen}
                onClick={() => toggle(!isOpen)}
                strokeWidth="5"
                color="#ffffff"
                lineProps={{ strokeLinecap: "round" }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                width="30"
                height="30"
                className="mt-[10px] ml-[10px]"
            />
        </motion.div>
    );
}