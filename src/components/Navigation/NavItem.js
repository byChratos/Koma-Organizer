import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NavItem({ name, link, isOpen, index, setPage }){

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
        hover: {
            scale: 1.1,
            transition: {
                type: "spring",
                duration: 0.3
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
                whileHover="hover"
                whileTap="tap"
                animate={isOpen ? "open" : "closed"}
            >
                <motion.button className="w-full h-full font-merri bg-[#3943B7] rounded-lg text-white drop-shadow-md"> {name} </motion.button>
            </motion.li>
        </AnimatePresence>
    );
}