import React from "react";
import { motion } from "framer-motion";
import NavItem from "./NavItem";
import NavSeparator from "./NavSeparator";
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

export default function Navbar({ isOpen, setPage, activePage }) {

    const pages = [{ name: "Home", link: "/"}, { name: "Calendar", link: "/calendar" }, { name: "Add", link: "/add"}, { name: "Priority", link: "/priority" }]

    return(
        <motion.nav
            className="absolute w-full h-full bg-lightPrimary dark:bg-darkPrimary top-0 left-0 z-10 flex flex-row"
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={variants}
        >
            <motion.ul className="flex flex-row h-full w-full ml-[82px]">
                {pages.map((page, index) => (
                    <React.Fragment key={page["name"]}>
                        {index != 0 ? <NavSeparator key={"sep " + index} isOpen={isOpen} index={index} /> : null}
                        <NavItem key={page["name"]} name={page["name"]} link={page["link"]} isOpen={isOpen} index={index} setPage={setPage} active={page["name"] == activePage}/>
                    </React.Fragment>
                ))}
            </motion.ul>
            <Settings isOpen={isOpen} setPage={setPage} />
        </motion.nav>
    );
}