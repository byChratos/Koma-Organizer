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

const dropIn = {
    hidden: {
        scale: 0,
        opacity: 0,
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.3,
        },
    },
    exit: {
        scale: 0,
        opacity: 0,
    },
};

const buttons = {
    initial: {
        scale: 1,
    },
    hover: {
        scale: 1.15,
        transition: {
            duration: 0.2,
        }
    },
    tap: {
        scale: 0.95,
    }
}

export default function DayInformationModal({ modalOpen, setModalType, day }) {
    
    useEffect(() => {
        load();
    }, [])

    async function load(){
        const response = await window.api.loadList();
        if(response != "empty"){
            setList(response);
        }else{
            await window.api.storeList(list);
        }
    }

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
                className="bg-[#393E46] w-[80%] h-[75%] mt-[84px] rounded-xl overflow-hidden"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
            {/* Heading Div */}
            <div className='bg-[#222831] w-full h-[15%] inline-block drop-shadow-md'>
                <h1 className="text-white text-3xl font-merri float-left mt-[1%] mx-[1%]"> {day} </h1>
                <motion.button
                    className="bg-red-500 h-[50px] w-[100px] rounded-xl mt-[1%] mx-[1%] float-right font-merri text-lg text-black"
                    onClick={() => {close()}}
                    variants={buttons}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                >Close</motion.button>
            </div>

            {/* Body Div */}
            <div className="w-full h-[85%] p-2 flex flex-col mt-[-0.5%]">

                {/* Top Priority */}
                <div className="w-full h-[35%] rounded-xl overflow-hidden bg-[#222831] flex flex-row mb-2 drop-shadow-md">
                    <div className="bg-[#1c6569] p-3 w-fit h-fit rounded-br-xl">
                        <h2 className="text-lg text-white font-merri">Your top priority today:</h2>
                    </div>

                    <div className="w-[70%] h-[90%] bg-[#1c6569] p-2 my-auto mx-auto flex flex-row rounded-xl">
                        {(top["type"] == "empty") &&
                            <EntityInformation name="Your Calendar is empty" imageSrc={"https://i.ds.at/MxdaKg/rs:fill:750:0/plain/2021/07/29/572c4830-721d-11eb-bb63-96959c3b62f2.jpg"} />
                        }

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
                    
                </div>

                {/* Rest */}
                <div className="w-full h-[65%] flex flex-row">
                    <div className="w-[32%] h-full bg-[#222831] rounded-xl drop-shadow-md flex flex-col overflow-y-scroll overflow-x-hidden">
                        <h2 className="text-white font-merri text-lg text-center py-1">Other Characters</h2>
                        {(characters != null) && <CharacterListModal characters={characters}/>}
                    </div>
                    
                    <div className="w-[32%] mx-auto h-full bg-[#222831] rounded-xl drop-shadow-md flex flex-col overflow-auto">
                        <h2 className="text-white font-merri text-lg text-center py-1">Other Weapons</h2>
                        {(weapons != null) && <WeaponListModal weapons={weapons}/>}
                    </div>

                    <div className="w-[32%] h-full bg-[#222831] rounded-xl drop-shadow-md flex flex-col overflow-auto">
                        <h2 className="text-white font-merri text-lg text-center py-1">Other Artifacts</h2>
                        {(artifacts != null) && <ArtifactListModal artifacts={artifacts}/>}
                    </div>
                </div>
            </div>


            {/*
            <div className='w-full h-[85%] overflow-y-auto overflow-x-hidden grid grid-cols-3 grid-rows-3 gap-4 p-[1%] mt-[-0.5%]'>
                <div className="bg-[#222831] w-full h-full row-start-1 col-start-1 col-span-full rounded-md flex overflow-hidden">

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

                <div className="bg-[#222831] w-full h-full row-start-2 col-start-1 row-span-2 rounded-md overflow-auto">
                    {(characters != null) && <CharacterListModal characters={characters}/>}
                </div>
                <div className="bg-[#222831] w-full h-full row-start-2 col-start-2 row-span-2 rounded-md">
                    {(weapons != null) && <WeaponListModal weapons={weapons}/>}
                </div>
                <div className="bg-[#222831] w-full h-full row-start-2 col-start-3 row-span-2 rounded-md">
                    {(artifacts != null) && <ArtifactListModal artifacts={artifacts}/>}
                </div>
            </div>*/}
            

            </motion.div>
        </Backdrop>
    );
}