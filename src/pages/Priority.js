import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';

import PopUp from '../components/Modals/PopUp';
import ReoItem from '../components/ReoItem';

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
        console.log(response);
        console.log(list);
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

    return(
        <motion.div
            className="flex flex-col h-screen items-center pb-[84px]"
            variants={variants}
            initial="initial"
            animate="animate"
        >

            {(saved) && <PopUp message="ABC" setModalOpen={setSaved} />}

            {/* <h2 className='text-gray-100'>Sort your Characters, Weapons and Artifacts by priority! Highest priority available to farm will be displayed first</h2> */}
            
            {/* Content */}
            <div className="w-[90%] h-[100px] flex-none flex flex-row items-center pl-5">
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

            <div className='w-[90%] bg-[#42413F] rounded-xl'>
                <Reorder.Group className="h-full" axis='y' values={list} onReorder={setList}>
                    {list.map((entry, index) => (
                        <ReoItem key={entry["id"]} entry={entry} />
                    ))}
                </Reorder.Group>
            </div>
        </motion.div>
    );
}

{/*
<div className="flex w-full h-[50px] bg-blue-500 mb-3 rounded-lg overflow-hidden">
    <div className="cursor-move flex float-left w-[50px] h-full text-center items-center rounded-l-md bg-blue-500">
        <p className="w-full text-lg font-bold text-black hover:text-gray-700 hover:opacity-50">☰</p>
    </div>
    <div className="w-[300px] h-full select-none flex">
        {(item["type"] == "character") && <img className="flex-1" src={getAssetById("character", item["id"], "icon")} width="50" height="50"/>}
        {(item["type"] == "weapon") && <img className="flex-1" src={getAssetById("weapon", item["id"], "icon")} width="50" height="50" />}
        {(item["type"] == "artifact") && <img className="flex-1" src={getAssetById("artifact", item["id"], "icon")} width="50" height="50" />}
        <p className="w-[250px] text-left">{item["name"]}</p>
    </div>
    {(item["type"] == "character") && <div className="w-[150px] h-full select-none flex">
        <div className="bg-red-300 w-[50px] h-full rounded-full cursor-pointer" onClick={() => {swapListAtIndex(index, "boss")} }>
            {(list[index]["boss"] != false) ? <p>BOSS</p> : <p>NO</p>}
        </div>
        <div className="bg-red-300 w-[50px] h-full ml-[25px] rounded-full cursor-pointer" onClick={() => {swapListAtIndex(index, "talents")} }>
            {(list[index]["talents"] != false) ? <p>TALENT</p> : <p>NO</p>}
        </div>
    </div>}
    <div className="bg-red-500 w-[100px] h-full ml-auto">
        <button className="w-full h-full" onClick={() => remove(index)}>REMOVE</button>
    </div>
</div>
*/}