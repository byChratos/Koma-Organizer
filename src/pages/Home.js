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

/* Test Palette
    Dark: #3C3C3C
    Bittersweet: #FF5A5F
    Teal: #087E8B
    White Smoke: #F5F5F5
    Puce: #C1839F
*/

/* Test 2
    Dark: #222831
    Brighter Dark: #393E46
    Cyan: #00ADB5
    Whiteish: #EEEEEE
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

//TODO POPUP ULTRA KRASS MIT SO ERSTER DES MONATS SHOP REMINDER oder so

export default function Home() {

    const navigate = useNavigate();

    return(
        <motion.div
            className='flex flex-col h-screen'
            variants={variants}
            initial="initial"
            animate="animate"
        >
            {/* Content */}
            <div className="w-full h-full flex flex-col justify-center items-center bg-[#222831] drop-shadow-sm">
                <div className="w-[80%] h-[90%]">
                    <motion.button
                        className="w-[81%] h-[15%] bg-[#00ADB5] ml-[9.5%] mt-[10%] rounded-xl font-merri text-white text-xl drop-shadow-md hover:drop-shadow-xl"
                        whileHover="hover"
                        whileTap="tap"
                        variants={button}
                        onClick={() => navigate("/calendar")}>
                        Calendar
                    </motion.button>
                    <motion.button
                        className="w-[39.5%] h-[15%] bg-[#00ADB5] rounded-xl ml-[9.5%] mt-[1%] font-merri text-white text-lg drop-shadow-md hover:drop-shadow-xl"
                        whileHover="hover"
                        whileTap="tap"
                        variants={button}
                        onClick={() => navigate("/priority")}>
                        Priority
                    </motion.button>
                    <motion.button
                        className="w-[39.5%] h-[15%] bg-[#00ADB5] rounded-xl ml-[2%] mt-[1%] font-merri text-white text-lg drop-shadow-md hover:drop-shadow-xl"
                        whileHover="hover"
                        whileTap="tap"
                        variants={button}
                        onClick={() => navigate("/add")}>
                        Add
                    </motion.button>
                    <motion.button
                        className="w-[81%] h-[15%] bg-[#00ADB5] ml-[9.5%] mt-[1%] rounded-xl font-merri text-white text-xl drop-shadow-md hover:drop-shadow-xl"
                        whileHover="hover"
                        whileTap="tap"
                        variants={button}
                        onClick={() => navigate("/settings")}>
                        Settings
                    </motion.button>
                    <Links />
                </div>
                <div className="w-full h-[10%] text-center bg-[#393E46]">
                    <p className='text-white font-merri text-xs'>
                    DISCLAIMER© HoYoverse. All rights reserved. HoYoverse and Genshin Impact are trademarks, services marks, or registered trademarks of HoYoverse.</p>
                </div>
            </div>
        </motion.div>
    )
}