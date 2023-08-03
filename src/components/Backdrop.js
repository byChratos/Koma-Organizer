import React from 'react';
import { motion } from "framer-motion";

export default function Backdrop({ children, handleClick, setModalType }) {

    const handleDoubleClick = (e) => {
        switch (e.detail){
            case 1:
                break;
            case 2:
                setModalType(null);
                handleClick(false);
                break;
            case 3:
                break;
        }
    }

    return(
        <motion.div
            onClick={handleDoubleClick}
            className='absolute top-0 left-0 h-full w-full flex items-center justify-center overflow-y-hidden bg-[#000000e1]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0}}
        >
            {children}
        </motion.div>
    )

}