import React from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

import Links from '../components/Navigation/Links';

/* //! Color Palette:

    Light-Blue: #3873AA
    Blue: #3943B7
    Dark-Gray: #333231
    Gray: #787878

*/

const variants = {
    initial: {
        opacity: 0,
        x: "-100%",
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
        },
    },
}

const button = {
    tap: {
        scale: 0.975,
        transition: {
            type: "spring",
            duration: 0.1,
        },
    },
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.15,
        }
    },
}

export default function Home() {

    const navigate = useNavigate();

    return(
        <motion.div
            className='flex flex-col h-screen select-none'
            variants={variants}
            initial="initial"
            animate="animate"
        >
            {/* Content */}
            <div className="w-full h-full flex flex-col justify-center items-center bg-[#333231] drop-shadow-sm">
                <div className="w-[80%] h-[90%]">
                    <motion.button
                        className="w-[81%] h-[15%] bg-[#3873AA] hover:bg-[#4686c2] ml-[9.5%] mt-[10%] rounded-xl font-merri text-white text-xl drop-shadow-md hover:drop-shadow-xl"
                        whileHover="hover"
                        whileTap="tap"
                        variants={button}
                        onClick={() => navigate("/calendar")}>
                        Calendar
                    </motion.button>
                    <motion.button
                        className="w-[39.5%] h-[15%] bg-[#3873AA] hover:bg-[#4686c2] rounded-xl ml-[9.5%] mt-[1%] font-merri text-white text-lg drop-shadow-md hover:drop-shadow-xl"
                        whileHover="hover"
                        whileTap="tap"
                        variants={button}
                        onClick={() => navigate("/priority")}>
                        Priority
                    </motion.button>
                    <motion.button
                        className="w-[39.5%] h-[15%] bg-[#3873AA] hover:bg-[#4686c2] rounded-xl ml-[2%] mt-[1%] font-merri text-white text-lg drop-shadow-md hover:drop-shadow-xl"
                        whileHover="hover"
                        whileTap="tap"
                        variants={button}
                        onClick={() => navigate("/add")}>
                        Add
                    </motion.button>
                    <Links />
                </div>
                <div className="w-full h-[10%] text-center bg-[#42413F]">
                    <p className='text-white font-merri text-xs'>
                    DISCLAIMER© HoYoverse. All rights reserved. HoYoverse and Genshin Impact are trademarks, services marks, or registered trademarks of HoYoverse.</p>
                </div>
            </div>
        </motion.div>
    )
}