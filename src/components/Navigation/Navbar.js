import React from "react";
import { motion } from "framer-motion";

const variants = {
    initial: {
        scale: 0,
    },
    active: {
        scale: 1,
        transition: {
            duration: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 20,
        }
    },
}

export default function Navbar() {
    return(
        <motion.div
            className="absolute w-full h-full bg-[#3943B7] top-0 left-0 z-10"
            initial="initial"
            animate="active"
            variants={variants}>
        
        </motion.div>
    );
}