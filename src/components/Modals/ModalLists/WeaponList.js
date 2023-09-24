import React, { useState } from "react";
import FarmableMaterial from "../ModalComponents/FarmableMaterial";
import { AnimatePresence, motion } from "framer-motion";
import DrowDown from "./DropDown";
import { getWeaponMaterial } from "../../../functions/nonModuleFunctions";

export default function WeaponList({ weapon, weaponData, data }) {
    
    const variants = {
        initial: {
            height: "50px",
        },
        oneOpen: {
            height: "129px",
            transition: {
                duration: 0.2,
            }
        }
    }

    const liItems = {
        closed: {
            height: "0px",
        },
        open: {
            height: "150px",
            transition: {
                duration: 0.2,
            }
        },
        oneOpen: {
            height: "79px",
            transition: {
                duration: 0.2
            }
        }
    }

    const[isOpen, setIsOpen] = useState(false);

    function handleClick() {
        setIsOpen(!isOpen);
    }

    let materialId = getWeaponMaterial(weapon["weaponId"], weaponData);
    console.log("MID: " + materialId);

    return(
        <motion.div
            className="h-auto w-[95%] bg-lightSecondary dark:bg-darkSecondary my-[6px] rounded-xl flex flex-col overflow-hidden"
            variants={variants}
            animate={isOpen ? "oneOpen" : "initial"}
        >
            <div className={`w-full h-[50px] flex flex-row items-center transition-colors ease-in-out ${isOpen ? 'bg-lightPrimary dark:bg-darkPrimary' : 'bg-lightSecondary dark:bg-darkSecondary'}`}>
                <img src={weapon["weaponUrl"]} width="50" height="50"/>
                <h1 className={`font-merri text-lightFontTwo dark:text-darkFont ${weapon["weaponName"].length > 25 ? 'text-sm' : 'text-md'} ml-2 p-2 selection:text-lightFont dark:selection:text-darkFont selection:bg-lightBGTwo dark:selection:bg-darkBGTwo ${isOpen ? 'hover:bg-lightSecondary dark:hover:bg-darkSecondary' : 'hover:bg-lightPrimary dark:hover:bg-darkPrimary'} rounded-xl select-text`}>{weapon["weaponName"]}</h1>
                <button className={`ml-auto mr-2 ${isOpen ? 'hover:bg-lightSecondary dark:hover:bg-darkSecondary' : 'hover:bg-lightPrimary dark:hover:bg-darkPrimary'} rounded-xl`} onClick={() => handleClick()}>
                    <DrowDown
                        width="40" height="40"
                        isOpen={isOpen}
                        color="#ffffff"
                        strokeWidth="4"
                        lineProps={{ strokeLinecap: "round" }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    />
                </button>
            </div>
            <AnimatePresence>
                {(isOpen) && 
                <motion.div 
                    className={`w-full h-fit bg-lightSecondary dark:bg-darkSecondary p-2 flex flex-col`}
                    variants={liItems}
                    initial="closed"
                    animate="oneOpen"
                    exit="closed"
                >
                    <FarmableMaterial type="weapon" materialImgUrl={weapon["materialUrl"]} materialId={materialId} other={false} data={data}/>
                </motion.div>}
            </AnimatePresence>
        </motion.div>
    );
}