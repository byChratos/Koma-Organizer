import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FarmableMaterial from "../ModalComponents/FarmableMaterial";
import DrowDown from "./DropDown";

export default function CharList({ className, char }) {

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
    let talentStyle, bossStyle = "";

    if(char["bossId"] == false){
        talentStyle = "row-start-1 row-span-2 col-start-1"
    }else if(char["talentId"] == false){
        bossStyle = "row-start-1 row-span-2 col-start-1"
    }


    function handleClick() {
        setIsOpen(!isOpen);
    }

    const oneOpen = (char["talentId"] != false) && (char["bossId"] != false);

    return(
        <motion.div
            className="h-auto w-[95%] bg-[#1c6569] my-[6px] rounded-xl flex flex-col overflow-hidden"
            variants={variants}
            animate={isOpen ? `${oneOpen ? "open" : "oneOpen"}` : "initial"}
        >
            <div className={`w-full h-[50px] flex flex-row items-center transition-colors ease-in-out ${isOpen ? 'bg-[#00ADB5]' : 'bg-[#1c6569]'}`}>
                <img src={char["charUrl"]} width="50" height="50"/>
                <h1 className="font-merri text-white text-md ml-2">{char["charName"]}</h1>
                <button className="ml-auto mr-2" onClick={() => handleClick()}>
                    <DrowDown
                        width="50" height="50"
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
                    animate={oneOpen ? "open" : "oneOpen"}
                    exit="closed"
                >
                    {(char["talentId"] != false) && <FarmableMaterial className={talentStyle} type="talent" materialImgUrl={char["talentUrl"]} materialId={char["talentId"]} other={char["bossId"]}/>}
                    {(char["bossId"] != false) && <FarmableMaterial className={bossStyle} type="boss" materialImgUrl={char["bossUrl"]} materialId={char["bossId"]} other={char["talentId"]} bottom={true}/>}
                </motion.div>}
            </AnimatePresence>
        </motion.div>
    );
}