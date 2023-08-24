import React, { useState, useRef } from 'react';
import fs from "fs";
import path from "path";
import PopUp from '../components/Modals/PopUp';

import calendarData from "../../calendar.json";
const { ipcRenderer } = window.require("electron");
import { getAssetById } from "../functions/enkaFunctions";

export default function Priority() {

    const dragItem = useRef();
    const dragOverItem = useRef();
    const[list, setList] = useState(calendarData);

    const[saved, setSaved] = useState(false);


    const dragStart = (e, position) => {
        dragItem.current = position;
    };

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
    };

    const drop = (e) => {
        const copyListItems = [...list];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setList(copyListItems);
    }

    function save(){
        try{
            const filePath = path.resolve(__dirname, "calendar.json");
    
            const jsonString = JSON.stringify(list, null, 2);
            fs.writeFile(filePath, jsonString, (error) => {
                if(error){
                    console.error(error);
                    throw error;
                }
            });
    
        }catch(error){
            console.error(error);
        }
    }

    function remove(){
        //TODO Remove element from list
    }

    return(
        <div className="w-full h-full bg-green-800 px-[5%] py-[2%] text-center">

            {(saved) && <PopUp message="ABC" setModalOpen={setSaved} />}

            <h1 className='text-white text-lg'>Priority</h1>
            <h2 className='text-gray-100'>Sort your Characters, Weapons and Artifacts by priority! Highest priority available to farm will be displayed first</h2>
            
            <div className="w-full h-full bg-gray-700 overflow-auto p-3 rounded-lg">
                {list && 
                    list.map((item, index) => (
                        <div key={item["name"]}
                            className="flex w-full h-[50px] bg-blue-500 mb-3 rounded-lg overflow-hidden"
                            onDragStart={(e) => dragStart(e, index)}
                            onDragEnter={(e) => dragEnter(e, index)}
                            onDragEnd={drop}>
                                <div className="cursor-move flex float-left w-[50px] h-full text-center items-center rounded-l-md bg-blue-500" draggable>
                                    <p className="w-full text-lg font-bold text-black hover:text-gray-700 hover:opacity-50">☰</p>
                                </div>
                                <div className="w-[300px] h-full select-none flex">
                                    {(item["type"] == "character") && <img className="flex-1" src={getAssetById("character", item["id"], "icon")} width="50" height="50"/>}
                                    {(item["type"] == "weapon") && <img className="flex-1" src={getAssetById("weapon", item["id"], "icon")} width="50" height="50" />}
                                    {(item["type"] == "artifact") && <img className="flex-1" src={getAssetById("artifact", item["id"], "icon")} width="50" height="50" />}
                                    <p className="w-[250px] text-left">{item["name"]}</p>
                                </div>
                                {(item["type"] == "character") && <div className="w-[150px] h-full select-none flex">
                                    <div className="bg-red-300 w-[50px] h-full rounded-full">

                                    </div>
                                    <div className="bg-red-300 w-[50px] h-full ml-[25px] rounded-full">

                                    </div>
                                </div>}
                                <div className="bg-red-500 w-[100px] h-full ml-auto">
                                    <button className="w-full h-full" onClick={() => remove(item)}>REMOVE</button>
                                </div>
                        </div>
                ))}
                {/* TODO Save Button | Cancel Button */}
                <div>
                    <button className="w-[50px] h-[25px] text-white bg-black" onClick={() => save()}>SAVE</button>
                </div>
            </div>
        </div>
    );
}