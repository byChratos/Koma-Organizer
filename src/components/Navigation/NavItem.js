import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NavItem({ name, link, isOpen, index }){

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

    return(
        <AnimatePresence>
            <motion.li
                className="h-[75px] w-[150px] mx-2 mt-1" onClick={() => navigate(link)}
                variants={variants}
                whileHover="hover"
                whileTap="tap"
                animate={isOpen ? "open" : "closed"}
            >
                <button className="w-full h-full font-merri bg-[#4686c2] rounded-lg text-white drop-shadow-md"> {name} </button>
            </motion.li>
        </AnimatePresence>
    );
}