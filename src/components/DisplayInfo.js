import React from "react";
import { motion } from "framer-motion";

export default function DisplayInfo({name, add, remove}) {

    const buttons = {
        initial: {
            scale: 1,
        },
        hover: {
            scale: 1.1,
            transition: {
                duration: 0.2,
            }
        }
    }

    return(
        <div className="minW:w-[300px] mdW:w-[400px] h-fit bg-[#00ADB5] flex flex-col rounded-xl p-2 items-center justify-center minW:mt-[5px] mdW:mt-[10px] bg-opacity-70">
            
            <h1 className="font-merri text-white text-lg select-text selection:bg-[#00ADB5] hover:bg-[#1c6569] p-2 rounded-xl">{name}</h1>
            
            <motion.button
                className="text-white font-merri text-lg minW:h-[50px] minW:w-[200px] mdW:h-[75px] mdW:w-[300px] hover:bg-green-600 rounded-xl"
                onClick={() => add()}
                variants={buttons}
                initial="initial"
                whileHover="hover"
            >
                CONFIRM
            </motion.button>
            <motion.button
                className="text-white font-merri text-lg minW:h-[50px] minW:w-[200px] mdW:h-[75px] mdW:w-[300px] hover:bg-red-600 hover:text-black rounded-xl"
                onClick={() => remove()}
                variants={buttons}
                initial="initial"
                whileHover="hover"
            >
                CANCEL
            </motion.button>
        </div>
    );
}