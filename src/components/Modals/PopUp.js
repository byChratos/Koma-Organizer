import React from "react";
import { motion } from 'framer-motion';

import Backdrop from "./Backdrop";

export default function PopUp({ message, setModalOpen }) {
    
    function modalType(){
        null
    }

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

    function close(){
        setModalOpen(false);
    }

    return(
        <Backdrop handleClick={ setModalOpen } setModalType={ modalType }>
            <motion.div
                    onClick={(e) => e.stopPropagation()}
                    className='bg-gray-800 w-[40%] h-[30%] rounded-[20px] overflow-hidden'
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <p className="text-white"> {message} </p>
                    <button className="w-[50px] h-[50px] bg-red-500" onClick={() => close()}> CLOSE </button>
                </motion.div>
        </Backdrop>
    );
}