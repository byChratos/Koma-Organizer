import React, { useState, useRef, useEffect } from 'react';
import PopUp from '../components/Modals/PopUp';

import calendarData from "../../calendar.json";
const { ipcRenderer } = window.require("electron");
import { getAssetById } from "../functions/enkaFunctions";

export default function Priority() {

    useEffect(() => {
        load();
    }, []);

    const dragItem = useRef();
    const dragOverItem = useRef();

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

    function load(){
        ipcRenderer.send("loadList", "Prio");
    }

    ipcRenderer.on("loadedListPrio", (event, list) => {
        if(list != "empty"){
            setList(list);
        }else{
            ipcRenderer.send("storeList", calendarData);
        }
    });

    function save(){
        ipcRenderer.send("saveList", list)
    }

    ipcRenderer.on("savedList", (event, success) => {
        if(success){
            setSaved(true);
        }
    });

    function remove(index){
        //TODO Remove element from list
        setList(list.slice(0, index).concat(list.slice(index + 1)));
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
                                    <div className="bg-red-300 w-[50px] h-full rounded-full cursor-pointer" onClick={() => swapListAtIndex(index, "boss") }>
                                        {/* TODO Click on these buttons will toggle boss/talents = true/false */}
                                        {(list[index]["boss"] != false) ? <p>BOSS</p> : <p>NO</p>}
                                    </div>
                                    <div className="bg-red-300 w-[50px] h-full ml-[25px] rounded-full cursor-pointer" onClick={() => swapListAtIndex(index, "talents") }>
                                        {(list[index]["talents"] != false) ? <p>TALENT</p> : <p>NO</p>}
                                    </div>
                                </div>}
                                <div className="bg-red-500 w-[100px] h-full ml-auto">
                                    <button className="w-full h-full" onClick={() => remove(index)}>REMOVE</button>
                                </div>
                        </div>
                ))}
                {/* Save Button | Cancel Button */}
                <div>
                    <button className="w-[50px] h-[25px] text-black bg-green-400 hover:bg-green-600 rounded-full" onClick={() => save()}>SAVE</button>                    
                    <button className="w-[80px] h-[25px] text-black bg-opacity-0 hover:bg-opacity-100 bg-red-500 rounded-full ml-3" onClick={() => load()}>CANCEL</button>
                </div>
            </div>
        </div>
    );
}