import React from "react";
import { motion } from 'framer-motion';

import Backdrop from "./Backdrop";

export default function PopUp({ message, setModalOpen, closeEnabled }) {
    
    function modalType(){
        null
    }

    const dropIn = {
        hidden: {
            scale: 0,
            opacity: 0,
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.3,
            },
        },
        exit: {
            scale: 0,
            opacity: 0,
        },
    };

    function close(){
        setModalOpen(false);
    }

    return(
        <Backdrop handleClick={ setModalOpen } setModalType={ modalType }>
            <motion.div
                    onClick={(e) => e.stopPropagation()}
                    className='bg-[#222831] w-[40%] h-[30%] mt-[84px] rounded-lg overflow-hidden flex flex-col items-center justify-center'
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <p className="text-white font-merri text-xl my-auto"> {message} </p>
                    {closeEnabled && <button className="w-[70%] h-[50px] hover:bg-red-500 transition-colors ease-in-out mt-auto mb-3 text-white font-merri p-2 rounded-lg drop-shadow-md" onClick={() => close()}> Close </button>}
                </motion.div>
        </Backdrop>
    );
}