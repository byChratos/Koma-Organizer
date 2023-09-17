import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import PopUp from '../components/Modals/PopUp';

import calendarData from "../../calendar.json";
import { getAssetById } from "../functions/enkaFunctions";

export default function Priority() {

    const variants = {
        initial: {
            opacity: 0,
            x: "-100%",
        },
        animate: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
            },
        }
    }

    const buttons = {
        hover: {
            scale: 1,
            transition: {
                type: "spring",
                duration: 0.3
            }
        },
        small: {
            scale: 0.925
        },
        hover2: {
            scale: 1,
            transition: {
                type: "spring",
                duration: 0.3
            }
        },
        hover3: {
            scale: 1.3,
            transition: {
                type: "spring",
                duration: 0.3,
            }
        },
        tap: {
            scale: 0.95,
            transition: {
                type: "spring",
                stiffness: 500,
                damping: 15,
                duration: 0.1,
            }
        }
    }

    const listItem = {
        hover: {
            scale: 1.025,
            transition: {
                type: "spring",
                duration: 0.2,
            }
        }
    }

    const divVars = {
        initial: {
            opacity: 0,
            y: "50%"
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            }
        }
    }

    useEffect(() => {
        load();
    }, []);

    const[list, setList] = useState(calendarData);
    const[changes, setChanges] = useState(false);
    const[saved, setSaved] = useState(false);

    function swapListAtIndex(index, type){
        const updatedList = [...list];
        if(type == "boss"){
            updatedList[index] = { ...updatedList[index], boss: (!updatedList[index]["boss"]) }
        }else{
            updatedList[index] = { ...updatedList[index], talents: (!updatedList[index]["talents"]) }
        }
        setList(updatedList);
    }

    async function load(){

        const response = await window.api.loadList();
        if(response == "empty"){
            await window.api.storeList(list);
        }else{
            setList(response);
            setChanges(false);
        }
    }

    async function save(){
        const response = await window.api.saveList(list);
        if(response){
            setSaved(true);
            setChanges(false);
        }
    }

    function remove(index){
        setList(list.slice(0, index).concat(list.slice(index + 1)));
    }

    function swap(firstIndex, secondIndex){
        let arr = Array.from(list);
        const tmp = arr[firstIndex];
        arr[firstIndex] = arr[secondIndex];
        arr[secondIndex] = tmp;

        setList(arr);
    }

    function buttonClick(indexOne, indexTwo) {
        swap(indexOne, indexTwo);
        setChanges(true);
    }

    return(
        <motion.div
            className="flex flex-col h-full pb-[104px]"
            variants={variants}
            initial="initial"
            animate="animate"
        >

            {(saved) && <PopUp message="ABC" setModalOpen={setSaved} />}

            {/* <h2 className='text-gray-100'>Sort your Characters, Weapons and Artifacts by priority! Highest priority available to farm will be displayed first</h2> */}
            
            {/* Content */}
            <div className="w-full h-[120px] flex flex-row">
                <div className="w-[302px] h-[100px] bg-[#393E46] rounded-t-xl flex-none flex flex-row items-center px-5 mt-5 ml-[5%]">
                    <motion.button
                        className={`w-[125px] h-[75px] text-black font-merri font-lg rounded-lg drop-shadow-md ${changes ? 'text-black bg-green-500' : 'text-white'}`} onClick={() => save()}
                        variants={buttons}
                        initial="small"
                        whileHover="hover"
                        whileTap="tap"
                        disabled={!changes}
                    >SAVE</motion.button>
                    <motion.button
                        className={`w-[125px] h-[75px] text-black font-merri font-lg rounded-lg ml-3 drop-shadow-md ${changes ? 'text-black bg-red-500' : 'text-white'}`} onClick={() => load()}
                        variants={buttons}
                        initial="small"
                        whileHover="hover"
                        whileTap="tap"
                        disabled={!changes}
                    >CANCEL</motion.button>
                </div>

                <motion.div className="w-[250px] h-[40px] mt-[80px] ml-5 rounded-t-xl bg-[#393E46] flex items-center" variants={divVars} animate={changes ? 'animate' : 'initial'}>
                    <p className="w-full text-white font-merri text-center">You have unsaved changes!</p>
                </motion.div>
            </div>
            <div className='w-[90%] h-fit bg-[#393E46] rounded-b-xl rounded-tr-xl drop-shadow-md items-center flex flex-col ml-[5%] p-5 overflow-x-hidden overflow-y-auto'>
                <div className="w-full">
                    {list.map((item, index) => (
                        <motion.div key={item["id"]}
                            className="bg-[#00ADB5] w-full h-[70px] rounded-xl my-2 flex flex-row overflow-hidden drop-shadow-sm"
                            variants={listItem}
                        >
                            <div className="flex flex-col w-[50px] h-full">
                                <div className='w-[50px] h-[35px]'>
                                    <button className="w-full h-full" onClick={()=> (index > 0) ? buttonClick(index, index-1)  : null}>
                                        <motion.div className="w-full h-full flex items-center justify-center" variants={buttons} whileHover="hover3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-white" width="20" height="10" viewBox="0 0 20 10">
                                                <path d="M 0 10 L 10 0 L 20 10 L 0 10"/>
                                            </svg>
                                        </motion.div>
                                    </button>
                                </div>
                                <div className='w-[50px] h-[35px]'>
                                    <button className="w-full h-full" onClick={() => (index + 1 < list.length) ? buttonClick(index, index+1) : null}>
                                        <motion.div className="w-full h-full flex items-center justify-center" variants={buttons} whileHover="hover3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-white" width="20" height="10" viewBox="0 0 20 10">
                                                <path d="M 0 0 L 10 10 L 20 0 L 0 0"/>
                                            </svg>
                                        </motion.div>
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-row w-full">
                                <div className="h-full w-[400px] flex flex-row ml-2">
                                    <div className="w-[72px] h-[70px] bg-[#1c6569] overflow-hidden">
                                        <img src={getAssetById(item["type"], item["id"], "icon")} width="70" height="70"/>
                                    </div>
                                    <div className="w-[330px] h-full flex items-center ml-2">
                                        <div className="w-fit h-fit rounded-lg hover:bg-[#1c6569] py-2 px-2">
                                            <p className="w-fit text-left font-merri text-lg text-white select-text selection:bg-[#393E46]">{item["name"]}</p>
                                        </div>
                                    </div>
                                </div>
                                {(item["type"] == "character") && <div className="minW:w-[165px] mdW:w-[400px] h-full select-none flex items-center">
                                    <motion.div className="bg-[#1c6569] minW:w-[60px] mdW:w-[187.5px] h-[60px] cursor-pointer rounded-lg" onClick={() => {swapListAtIndex(index, "boss"); setChanges(true)}} variants={buttons} initial="small" whileHover="hover2">
                                        <div className={`flex flex-row ${list[index]["boss"] == false ? 'grayscale' : 'grayscale-0'}`}>
                                            <img src={getAssetById("bossMaterial", list[index]["bossId"], "icon")} width="60" height="60" />
                                            <div className="mdW:flex minW:hidden h-[60px] items-center">
                                                <p className={`text-white font-merri ${list[index]["boss"] == false ? 'line-through decoration-2 decoration-gray-400' : 'no-underline'}`}>BOSS</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                    <motion.div className="bg-[#1c6569] minW:w-[60px] mdW:w-[187.5px] h-[60px] ml-[25px] cursor-pointer rounded-lg" onClick={() => {swapListAtIndex(index, "talents"); setChanges(true)}} variants={buttons} initial="small" whileHover="hover2">
                                        <div className={`flex flex-row ${list[index]["talents"] == false ? 'grayscale' : 'grayscale-0'}`}>
                                            <img src={getAssetById("material", list[index]["talentsId"], "icon")} width="60" height="60" />
                                            <div className="mdW:flex minW:hidden h-[60px] items-center">
                                                <p className={`text-white font-merri ${list[index]["talents"] == false ? 'line-through decoration-2 decoration-gray-400' : 'no-underline'}`}>TALENTS</p>
                                            </div>
                                        </div>
                                        
                                    </motion.div>
                                </div>}
                                <div className="ml-auto w-[100px] h-full hover:bg-red-500">
                                    <button className="w-full h-full font-merri text-white hover:text-black" onClick={() => {remove(index); setChanges(true)}}>REMOVE</button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}