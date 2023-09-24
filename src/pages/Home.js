import React, { useState, useEffect, useContext } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import Links from '../components/Navigation/Links';
import logoDark from "../Images/Koma_Koma White.png";
import logoLight from "../Images/Koma_Koma Black.png";
import { PageContext } from '../components/PageContext';

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

    useEffect(() => {
        //getState();
    }, [])

    //TODO 1. call update function and set updating to true, as soon as value returns updating = false
    async function getState(){
        setUpdate(true);
        let up = await window.api.update();
        if(up){
            setUpdate(false);
        }
    }

    const navigate = useNavigate();
    const[update, setUpdate] = useState(false);

    const {
        page,
        setPage,
        theme
    } = useContext(PageContext);


    return(
        <motion.div
            className='flex flex-col h-screen pb-[84px]'
            variants={variants}
            initial="initial"
            animate="animate"
        >
            {/* Content */}
            {!update && <></>}
            <div className="w-full h-full flex flex-col justify-center items-center bg-lightBG dark:bg-darkBG drop-shadow-sm">
                <div className="w-[80%] h-[90%]">
                    <div className='flex items-center justify-center w-[70%] ml-[15%] mt-[2%]'>
                        {(theme ===  'dark') ? <img src={logoDark} alt="logo" width="full" height="auto" /> : <img src={logoLight} alt="logo" width="full" height="auto"/>}
                    </div>
                    <motion.button
                        className="w-[81%] h-[15%] bg-lightPrimary dark:bg-darkPrimary ml-[9.5%] mt-[2%] rounded-xl font-merri text-lightFontTwo dark:text-darkFont text-xl drop-shadow-md hover:drop-shadow-xl"
                        whileHover="hover"
                        whileTap="tap"
                        variants={button}
                        onClick={() => { setPage("Calendar"); navigate("/calendar") }}>
                        Calendar
                    </motion.button>
                    <motion.button
                        className="w-[39.5%] h-[15%] bg-lightPrimary dark:bg-darkPrimary rounded-xl ml-[9.5%] mt-[1%] font-merri text-lightFontTwo dark:text-darkFont text-lg drop-shadow-md hover:drop-shadow-xl"
                        whileHover="hover"
                        whileTap="tap"
                        variants={button}
                        onClick={() => { setPage("Priority"); navigate("/priority") }}>
                        Priority
                    </motion.button>
                    <motion.button
                        className="w-[39.5%] h-[15%] bg-lightPrimary dark:bg-darkPrimary rounded-xl ml-[2%] mt-[1%] font-merri text-lightFontTwo dark:text-darkFont text-lg drop-shadow-md hover:drop-shadow-xl"
                        whileHover="hover"
                        whileTap="tap"
                        variants={button}
                        onClick={() => { setPage("Add"); navigate("/add") }}>
                        Add
                    </motion.button>
                    <motion.button
                        className="w-[81%] h-[15%] bg-lightPrimary dark:bg-darkPrimary ml-[9.5%] mt-[1%] rounded-xl font-merri text-lightFontTwo dark:text-darkFont text-xl drop-shadow-md hover:drop-shadow-xl"
                        whileHover="hover"
                        whileTap="tap"
                        variants={button}
                        onClick={() => { setPage("Settings"); navigate("/settings") }}>
                        Settings
                    </motion.button>
                    <Links />
                </div>
                <div className="w-full h-fit mt-auto text-center bg-lightBGTwo dark:bg-darkBGTwo">
                    <p className='text-lightFont dark:text-darkFont font-merri text-xs'>
                    DISCLAIMER© HoYoverse. All rights reserved. HoYoverse and Genshin Impact are trademarks, services marks, or registered trademarks of HoYoverse.</p>
                </div>
            </div>
        </motion.div>
    )
}