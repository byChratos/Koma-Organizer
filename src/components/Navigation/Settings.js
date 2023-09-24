import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const variants = {
    open: {
        x: 0,
        opacity: 1,
        transition: {
            delay: 4.5 * 0.2,
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
    tap: {
        scale: 0.95,
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 15,
            duration: 0.1,
        }
    }
}

export default function Settings({ isOpen, setPage }) {
    
    const navigate = useNavigate();

    function nav(link, name) {
        navigate(link);
        setPage(name);
    }

    return(
        <AnimatePresence>
            <motion.div
                className="h-[75px] w-[150px] mx-2 mt-1" onClick={() => nav("/settings", "Settings")}
                variants={variants}
                whileTap="tap"
                animate={isOpen ? "open" : "closed"}
            >
                <motion.button className="w-full h-full font-merri hover:bg-lightSecondary dark:hover:bg-darkSecondary rounded-lg text-lightFontTwo dark:text-darkFont drop-shadow-md"> Settings </motion.button>
            </motion.div>
        </AnimatePresence>
    );
}