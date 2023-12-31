import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NavItem({ name, link, isOpen, index, setPage, active }){

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
        tap: {
            scale: 0.95,
            transition: {
                type: "spring",
                stiffness: 500,
                damping: 15,
                duration: 0.1,
            }
        }
    };

    const navigate = useNavigate();

    function nav() {
        navigate(link);
        setPage(name);
    }
    
    return(
        <AnimatePresence>
            <motion.li
                className="h-[75px] w-[150px] mx-2 mt-1" onClick={() => nav()}
                variants={variants}
                whileTap="tap"
                animate={isOpen ? "open" : "closed"}
            >
                <motion.button className={`w-full h-full font-merri hover:bg-lightSecondary dark:hover:bg-darkSecondary text-lightFontTwo dark:text-darkFont rounded-lg drop-shadow-md ${active ? 'text-xl' : 'text-md no-underline'}`}> {name} </motion.button>
            </motion.li>
        </AnimatePresence>
    );
}