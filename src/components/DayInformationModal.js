import React, { useState } from 'react';
import { motion } from 'framer-motion';

import Backdrop from './Backdrop';

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

export default function DayInformationModal({ modalOpen, setModalType, day }) {
    
    function close(){
        setModalType(null);
        modalOpen(false);
    }

    return(
        <Backdrop handleClick={ modalOpen } setModalType={ setModalType }>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-800 w-[80%] h-[75%] rounded-[20px] overflow-hidden"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
            <h1 className="text-white"> {day} </h1>

            </motion.div>
        </Backdrop>
    );
}