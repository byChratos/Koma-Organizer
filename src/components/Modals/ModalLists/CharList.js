import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FarmableMaterial from "../ModalComponents/FarmableMaterial";
import DrowDown from "./DropDown";

export default function CharList({ char, farmData, bossData }) {

    const variants = {
        initial: {
            height: "50px",
        },
        open: {
            height: "200px",
            transition: {
                duration: 0.2,
            }
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

    const oneOpen = (char["talentId"] != false) && (char["bossId"] != false);

    return(
        <motion.div
            className="h-auto w-[95%] bg-lightSecondary dark:bg-darkSecondary my-[6px] rounded-xl flex flex-col overflow-hidden"
            variants={variants}
            animate={isOpen ? `${oneOpen ? "open" : "oneOpen"}` : "initial"}
        >
            <div className={`w-full h-[50px] flex flex-row items-center transition-colors ease-in-out ${isOpen ? 'bg-lightPrimary dark:bg-darkPrimary' : 'bg-lightSecondary dark:bg-darkSecondary'}`}>
                <img src={char["charUrl"]} width="50" height="50"/>
                <h1 className={`font-merri text-lightFontTwo dark:text-darkFont text-md ml-2 p-2 selection:text-lightFont dark:selection:text-darkFont selection:bg-lightBGTwo dark:selection:bg-darkBGTwo ${isOpen ? 'hover:bg-lightSecondary dark:hover:bg-darkSecondary' : 'hover:bg-lightPrimary dark:hover:bg-darkPrimary'} rounded-xl select-text`}>{char["charName"]}</h1>
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
                    animate={oneOpen ? "open" : "oneOpen"}
                    exit="closed"
                >
                    {(char["talentId"] != false) && <FarmableMaterial type="talent" materialImgUrl={char["talentUrl"]} materialId={char["talentId"]} other={char["bossId"]} data={farmData}/>}
                    {(char["bossId"] != false) && <FarmableMaterial type="boss" materialImgUrl={char["bossUrl"]} materialId={char["bossId"]} other={char["talentId"]} bottom={true} data={bossData}/>}
                </motion.div>}
            </AnimatePresence>
        </motion.div>
    );
}