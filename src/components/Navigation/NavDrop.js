import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(0px at 40px -40px)",
        transition: {
            delay: 0.2,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
}

export default function NavDrop({ isOpen }) {
    return(
        <AnimatePresence>
            <motion.div
                className={"absolute w-full h-full bg-black bg-opacity-60 z-50"}
                variants={variants}
                initial="closed"
                animate={(isOpen) ? "open" : "closed"}
            ></motion.div>
        </AnimatePresence>
    )
}