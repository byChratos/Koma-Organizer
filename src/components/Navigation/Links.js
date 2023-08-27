import React from "react";
import { motion } from "framer-motion";

import github from '../../icons/github.svg';

const variants = {

}

export default function Links() {
    return(
        <motion.div
            className="float-right h-full w-[250px] bg-green-300 flex flex-row items-center"
            variants={variants}
        >
            <a href="https://github.com/byChratos/gensho">
                <img src={github} alt="GitHub Repository" className="w-[50px] h-[50px]"/>
            </a>
        </motion.div>
    );
}