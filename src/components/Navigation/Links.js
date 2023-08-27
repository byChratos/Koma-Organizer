import React from "react";
import { motion } from "framer-motion";

import github from '../../icons/github.svg';

const variants = {

}

export default function Links() {
    return(
        <motion.div
            className="float-right h-full w-auto bg-green-300 flex flex-row"
            variants={variants}
        >
            <img src={github} width="50" height="50" />
        </motion.div>
    );
}