import React from "react";
import { getMaterialNameById, getWeaponMaterial } from "../../../functions/nonModuleFunctions";
import { motion } from "framer-motion";

export default function FarmableMaterial({ materialId, materialImgUrl, type, other, bottom, data }){

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

    let materialName = getMaterialNameById(type, materialId, data);


    return(
        <motion.div 
            className={`w-full ${other != false ? `h-[63px] ${bottom ? null : 'mb-2'}` : 'h-full'} bg-lightBG dark:bg-darkBGTwo rounded flex flex-row minW:pr-0 mdW:pr-2`}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="initial"
        >
            {/* Image */}
            <div className="h-[63px] w-[63px] flex items-center">
                <img src={materialImgUrl} width="50" height="50" />
            </div>
            {/* Name */}
            <div className="h-full w-fit flex items-center float-left">
                <p className={`text-lightFont dark:text-darkFont ${materialName.length > 25 ? 'text-sm' : 'text-md'} font-merri rounded-xl hover:bg-lightSecondary dark:hover:bg-darkSecondary select-text selection:bg-lightPrimary dark:selection:bg-darkPrimary minW:p-1 mdW:p-2`}> {materialName} </p>
            </div>
        </motion.div>
    );
}