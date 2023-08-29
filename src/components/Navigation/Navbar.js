import React from "react";
import { motion } from "framer-motion";
import NavItem from "./NavItem";
import Settings from "./Settings";

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
        clipPath: "circle(1px at 40px 40px)",
        transition: {
            delay: 0.2,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    }
}

export default function Navbar({ isOpen, setPage }) {

    const pages = [{ name: "Home", link: "/"}, { name: "Calendar", link: "/calendar" }, { name: "Add", link: "/add"}, { name: "Priority", link: "/priority" }]

    return(
        <motion.nav
            className="absolute w-full h-full bg-[#3873AA] top-0 left-0 z-10 flex flex-row"
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={variants}
        >
            <motion.ul className="flex flex-row h-full w-full ml-[82px]">
                {pages.map((page, index) => (
                    <NavItem key={page["name"]} name={page["name"]} link={page["link"]} isOpen={isOpen} index={index} setPage={setPage} />
                ))}
            </motion.ul>
            <Settings isOpen={isOpen} />
        </motion.nav>
    );
}