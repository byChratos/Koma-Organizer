import React, { useState } from "react";
import FarmableMaterial from "../ModalComponents/FarmableMaterial";
import { AnimatePresence, motion } from "framer-motion";
import DrowDown from "./DropDown";
import { getWeaponMaterial } from "../../../functions/nonModuleFunctions";

export default function WeaponList({ weapon }) {
    
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

    let materialId = getWeaponMaterial(weapon["weaponId"]);

    return(
        <motion.div
            className="h-auto w-[95%] bg-[#1c6569] my-[6px] rounded-xl flex flex-col overflow-hidden"
            variants={variants}
            animate={isOpen ? "oneOpen" : "initial"}
        >
            <div className={`w-full h-[50px] flex flex-row items-center transition-colors ease-in-out ${isOpen ? 'bg-[#00ADB5]' : 'bg-[#1c6569]'}`}>
                <img src={weapon["weaponUrl"]} width="50" height="50"/>
                <h1 className={`font-merri text-white ${weapon["weaponName"].length > 25 ? 'text-sm' : 'text-md'} ml-2 p-2 selection:bg-[#393E46] ${isOpen ? 'hover:bg-[#1c6569]' : 'hover:bg-[#00ADB5]'} rounded-xl select-text`}>{weapon["weaponName"]}</h1>
                <button className={`ml-auto mr-2 ${isOpen ? 'hover:bg-[#1c6569]' : 'hover:bg-[#00ADB5]'} rounded-xl`} onClick={() => handleClick()}>
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
                    className={`w-full h-fit bg-[#1c6569] p-2 flex flex-col`}
                    variants={liItems}
                    initial="closed"
                    animate="oneOpen"
                    exit="closed"
                >
                    <FarmableMaterial type="weapon" materialImgUrl={weapon["materialUrl"]} materialId={materialId} other={false}/>
                </motion.div>}
            </AnimatePresence>
        </motion.div>
    );
}
{/*
<button className={(isOpen) ? "bg-blue-400 hover:bg-blue-500 w-[95%] h-[150px]" : "bg-blue-400 hover:bg-blue-500 w-[95%] h-[50px] overflow-hidden"} onClick={() => handleClick()}>
    <div className="w-full h-full flex flex-col">
        <div className="w-full h-[50px] flex-1">
            <img className="object-cover inline-block float-left" src={weapon["weaponUrl"]} width="50" height="50"/>
            <h1 className="text-black flaot-left"> {weapon["weaponName"]} </h1>
        </div>
        
        {(isOpen) && <div className="w-full h-[100px] p-[3%] bg-red-100 rounded-b-md grid grid-rows-2 grid-cols-1 gap-3">
            <FarmableMaterial className="row-start-1 row-span-2 col-start-1" type="weapon" materialImgUrl={weapon["materialUrl"]} materialId={weapon["material"]} />
        </div>}
    </div>
</button>
*/}