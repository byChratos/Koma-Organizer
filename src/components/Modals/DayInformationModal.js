import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Backdrop from './Backdrop';
import EntityInformation from './ModalComponents/EntityInformation';
import MaterialInformation from './ModalComponents/MaterialInformation';

import { getDayNumber } from '../../functions/nonModuleFunctions';
import { getFarmable } from '../../functions/enkaFunctions';

import CharacterListModal from './ModalLists/CharacterListModal';
import WeaponListModal from './ModalLists/WeaponListModal';
import ArtifactListModal from './ModalLists/ArtifactListModal';

import calendarData from "../../../calendar.json";
const { ipcRenderer } = window.require("electron");

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

export default function DayInformationModal({ modalOpen, setModalType, day }) {
    
    useEffect(() => {
        load();
    }, [])

    function load(){
        ipcRenderer.send("loadList");
    }

    ipcRenderer.on("loadedList", (event, list) => {
        if(list != null){
            setList(list);
        }
    });

    const dayNumber = getDayNumber(day);

    const[list, setList] = useState(calendarData);

    const farmable = getFarmable(dayNumber, list);
    let[top, ...restOfFarmable] = farmable;

    if(top == null){
        top = {
            type: "empty",
        }
    }

    let characters = [];
    let weapons = [];
    let artifacts = [];

    //* Puts the other non top priority entries into their respective categories
    for(const entry of restOfFarmable){
        if(entry["type"] == "character"){
            characters.push(entry);
        }else if(entry["type"] == "weapon"){
            weapons.push(entry);
        }else{
            artifacts.push(entry);
        }
    }


    function close(){
        setModalType(null);
        modalOpen(false);
    }

    return(
        <Backdrop handleClick={ modalOpen } setModalType={ setModalType }>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-800 w-[80%] h-[75%] rounded-[20px] overflow-hidden"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
            {/* Heading Div */}
            <div className='bg-[#333333] rounded-t-[20px] w-full h-[15%] inline-block'>
                <h1 className="text-white float-left mt-[1%] mx-[1%]"> {day} </h1>
                <button className="bg-red-500 hover:bg-[#ff4e4e] h-[50px] w-[6%] rounded-full hover:rounded-[15px] mt-[1%] mx-[1%] float-right" onClick={() => {close()}}>Close</button>
            </div>


            {/* Body Div */}
            <div className='w-full h-[85%] overflow-y-auto overflow-x-hidden grid grid-cols-3 grid-rows-3 gap-4 p-[1%] mt-[-0.5%]'>
                {/* Top Priority */}
                <div className="bg-gray-700 w-full h-full row-start-1 col-start-1 col-span-full rounded-md flex overflow-hidden">

                    <div className="bg-gray-600 h-[50px] w-[450px] rounded-br-lg">
                        <h1 className='text-white text-lg'>Top Priority Today:</h1>
                    </div>

                    {(top["type"] == "empty") &&
                    <>
                        <EntityInformation name="Your Calendar is empty" imageSrc={"https://i.ds.at/MxdaKg/rs:fill:750:0/plain/2021/07/29/572c4830-721d-11eb-bb63-96959c3b62f2.jpg"} />
                    </>}

                    {(top["type"] == "character") &&
                    <>
                        <EntityInformation name={top["charName"]} imageSrc={top["charUrl"]} />
                        {(top["talentId"] != false) ? <MaterialInformation matId={top["talentId"]} matType="talent" imageSrc={top["talentUrl"]} /> : <MaterialInformation matId={top["bossId"]} matType="boss" imageSrc={top["bossUrl"]} />}
                    </>}

                    {(top["type"] == "weapon") &&
                    <>
                        <EntityInformation name={top["weaponName"]} imageSrc={top["weaponUrl"]} />
                        <MaterialInformation matId={top["material"]} matType={top["type"]} imageSrc={top["materialUrl"]} top={top} />
                    </>}

                    {(top["type"] == "artifact") &&
                    <>
                        <EntityInformation name={top["artifactName"]} imageSrc={top["artifactUrl"]} />
                    </>}

                </div>

                {/* Chars */}
                <div className="bg-gray-400 w-full h-full row-start-2 col-start-1 row-span-2 rounded-md overflow-auto">
                    {(characters != null) && <CharacterListModal characters={characters}/>}
                </div>
                {/* Weapons */}
                <div className="bg-gray-400 w-full h-full row-start-2 col-start-2 row-span-2 rounded-md">
                    {(weapons != null) && <WeaponListModal weapons={weapons}/>}
                </div>
                {/* Artifacts */}
                <div className="bg-gray-400 w-full h-full row-start-2 col-start-3 row-span-2 rounded-md">
                    {(artifacts != null) && <ArtifactListModal artifacts={artifacts}/>}
                </div>
            </div>
            

            </motion.div>
        </Backdrop>
    );
}