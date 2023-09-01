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
        },
    }

    const buttons = {
        hover: {
            scale: 1.1,
            transition: {
                type: "spring",
                duration: 0.3
            }
        },
        hover2: {
            scale: 1.05,
            transition: {
                type: "spring",
                duration: 0.3
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

    useEffect(() => {
        load();
    }, []);

    const[list, setList] = useState(calendarData);
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
        }
    }

    async function save(){
        const response = await window.api.saveList(list);
        if(response){
            setSaved(true);
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

    return(
        <motion.div
            className="flex flex-col h-full"
            variants={variants}
            initial="initial"
            animate="animate"
        >

            {(saved) && <PopUp message="ABC" setModalOpen={setSaved} />}

            {/* <h2 className='text-gray-100'>Sort your Characters, Weapons and Artifacts by priority! Highest priority available to farm will be displayed first</h2> */}
            
            {/* Content */}
            <div className="w-fit h-[100px] bg-[#393E46] rounded-t-xl flex-none flex flex-row items-center pl-5 mt-5 ml-[5%]">
                <motion.button
                    className="w-[125px] h-[75px] text-black font-merri font-lg bg-green-400 rounded-lg drop-shadow-md" onClick={() => save()}
                    variants={buttons}
                    whileHover="hover"
                    whileTap="tap"
                >SAVE</motion.button>
                <motion.button
                    className="w-[125px] h-[75px] text-black font-merri font-lg bg-red-500 rounded-lg ml-3 drop-shadow-md" onClick={() => load()}
                    variants={buttons}
                    whileHover="hover"
                    whileTap="tap"
                >CANCEL</motion.button>

                <motion.button onClick={() => console.log(list)}>
                    AE
                </motion.button>
            </div>

            <div className='w-[90%] h-[70%] bg-[#393E46] rounded-b-xl rounded-tr-xl drop-shadow-md items-center flex flex-col ml-[5%] p-5 overflow-auto'>
                {list.map((item, index) => (
                    <motion.div key={item["id"]}
                        className="bg-[#00ADB5] w-full h-[70px] rounded-xl my-2 flex flex-row overflow-hidden drop-shadow-sm"
                        variants={listItem}
                        //whileHover="hover"
                    >
                        <div className="flex flex-col w-[50px] h-full">
                            <div className='w-[50px] h-[35px]'>
                                <button className="w-full h-full hover:bg-green-500" onClick={()=> (index > 0) ? swap(index, index-1) : null}>UP</button>
                            </div>
                            <div className='w-[50px] h-[35px]'>
                                <button className="w-full h-full hover:bg-red-500" onClick={() => (index + 1 < list.length) ? swap(index, index+1) : null}>DOWN</button>
                            </div>
                        </div>
                        <div className="flex flex-row w-full">
                            <div className="h-full w-[400px] flex flex-row ml-2">
                                <div className="w-[70px] h-[70px] overflow-hidden">
                                    <img src={getAssetById(item["type"], item["id"], "icon")} width="70" height="70"/>
                                </div>
                                <div className="w-[330px] h-full flex items-center ml-2">
                                    <div className="w-fit h-fit rounded-lg bg-[#1c6569] py-2 px-2">
                                        <p className="w-fit text-left font-merri text-lg text-white select-text">{item["name"]}</p>
                                    </div>
                                </div>
                            </div>
                            {(item["type"] == "character") && <div className="minW:w-[165px] mdW:w-[400px] h-full select-none flex items-center">
                                <motion.div className="bg-[#1c6569] minW:w-[60px] mdW:w-[187.5px] h-[60px] cursor-pointer rounded-lg" onClick={() => {swapListAtIndex(index, "boss")}} variants={buttons} whileHover="hover2">
                                    <div className={`flex flex-row ${list[index]["boss"] == false ? 'grayscale' : 'grayscale-0'}`}>
                                        <img src={getAssetById("bossMaterial", list[index]["bossId"], "icon")} width="60" height="60" />
                                        <div className="mdW:flex minW:hidden h-[60px] items-center">
                                            <p className={`text-white font-merri ${list[index]["boss"] == false ? 'line-through decoration-2 decoration-gray-400' : 'no-underline'}`}>BOSS</p>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div className="bg-[#1c6569] minW:w-[60px] mdW:w-[187.5px] h-[60px] ml-[25px] cursor-pointer rounded-lg" onClick={() => {swapListAtIndex(index, "talents")}} variants={buttons} whileHover="hover2">
                                    <div className={`flex flex-row ${list[index]["talents"] == false ? 'grayscale' : 'grayscale-0'}`}>
                                        <img src={getAssetById("material", list[index]["talentsId"], "icon")} width="60" height="60" />
                                        <div className="mdW:flex minW:hidden h-[60px] items-center">
                                            <p className={`text-white font-merri ${list[index]["talents"] == false ? 'line-through decoration-2 decoration-gray-400' : 'no-underline'}`}>TALENTS</p>
                                        </div>
                                    </div>
                                    
                                </motion.div>
                            </div>}
                            <div className="ml-auto w-[100px] h-full hover:bg-red-500">
                                <button className="w-full h-full font-merri" onClick={() => remove(index)}>REMOVE</button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}