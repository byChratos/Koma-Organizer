import React from "react";
import { getMaterialNameById } from "../../../functions/nonModuleFunctions";
import { motion } from "framer-motion";

export default function FarmableMaterial({ materialId, materialImgUrl, type, other, bottom }){

    const otherBot = other && bottom
    let i = 0;
    if(otherBot){
        i = 0.2
    }

    const variants = {
        initial: {
            opacity: 0,
            y: "-18%",
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                delay: i + 0.2,
                duration: 0.4,
            }
        }
    }

    let materialName = getMaterialNameById(type, materialId);

    return(
        <motion.div 
            className={`w-full ${other != false ? `h-[63px] ${bottom ? null : 'mb-2'}` : 'h-full'} bg-[#393E46] rounded flex`}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="initial"
        >
            {/* Image */}
            <div className="h-full w-[20%] flex-1 flex items-center">
                <img src={materialImgUrl} width="50" height="50" />
            </div>
            {/* Name */}
            <div className="h-full w-[80%] flex items-center">
                <p className="text-white text-md font-merri"> {materialName} </p>
            </div>
        </motion.div>
    );
}