import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavSeparator({ isOpen, index }){

    const variants = {
        open: {
            x: 0,
            opacity: 1,
            transition: {
                delay: index * 0.2,
                x: { stiffness: 1000, velocity: -100 }
            }
        },
        closed: {
            x: -50,
            opacity: 0,
            transition: {
                x: { stiffness: 1000 }
            }
        },
    };

    
    
    return(
        <AnimatePresence>
            <motion.li
                className="h-[74px] w-[2px] bg-white rounded-lg mt-[5px] bg-gradient-to-b from-[#00ADB5] via-[#EEEEEE] to-[#00ADB5]"
                variants={variants}
                animate={isOpen ? "open" : "closed"}
            >
            </motion.li>
        </AnimatePresence>
    );
}