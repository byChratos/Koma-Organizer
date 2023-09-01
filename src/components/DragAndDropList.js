import React, { useState, useEffect} from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { getAssetById } from '../functions/enkaFunctions';



export default function DragAndDropList({ items, onDragEnd, swapListAtIndex, remove }) {

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
                {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {items.map((item, index) => (
                        <Draggable key={item["id"]} draggableId={item["id"].toString()} index={index}>
                            {(provided) => (
                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
                                            {(items[index]["boss"] != false) ? <p>BOSS</p> : <p>NO</p>}
                                        </div>
                                        <div className="bg-red-300 w-[50px] h-full ml-[25px] rounded-full cursor-pointer" onClick={() => {swapListAtIndex(index, "talents")} }>
                                            {(items[index]["talents"] != false) ? <p>TALENT</p> : <p>NO</p>}
                                        </div>
                                    </div>}
                                    <div className="bg-red-500 w-[100px] h-full ml-auto">
                                        <button className="w-full h-full" onClick={() => remove(index)}>REMOVE</button>
                                    </div>
                                </div>
                            </li>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
};

{/*
<DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
                {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {items.map((item, index) => (
                        <Draggable key={item["id"]} draggableId={item["id"].toString()} index={index}>
                            {(provided) => (
                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
                                            {(items[index]["boss"] != false) ? <p>BOSS</p> : <p>NO</p>}
                                        </div>
                                        <div className="bg-red-300 w-[50px] h-full ml-[25px] rounded-full cursor-pointer" onClick={() => {swapListAtIndex(index, "talents")} }>
                                            {(items[index]["talents"] != false) ? <p>TALENT</p> : <p>NO</p>}
                                        </div>
                                    </div>}
                                    <div className="bg-red-500 w-[100px] h-full ml-auto">
                                        <button className="w-full h-full" onClick={() => remove(index)}>REMOVE</button>
                                    </div>
                                </div>
                            </li>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </ul>
                )}
            </Droppable>
        </DragDropContext>
*/}