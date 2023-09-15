import React, { useState } from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";

export default function Day({ primary, dayName, handleButton, setDay }) {

    const buttons = {
        initial: {
            scale: 1,
        },
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.2,
            }
        },
        tap: {
            scale: 0.9,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                duration: 0.1,
            }
        }
    }

    function openModal() {
        handleButton(true);
        setDay(dayName);
    }

    return(
        <motion.button 
            className={`rounded-xl drop-shadow-lg ${primary ? 'bg-[#00ADB5] w-[55%] h-[60%]' : 'bg-[#1c6569] w-[40%] h-[70%]'}`}
            onClick={() => { openModal() }}
            variants={buttons}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
        >
            <h1 className={`text-white ${primary ? 'text-3xl' : 'text-xl'} font-merri`}> {dayName} </h1>
        </motion.button>
    );
}