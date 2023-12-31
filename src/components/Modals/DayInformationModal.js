import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import Backdrop from './Backdrop';
import EntityInformation from './ModalComponents/EntityInformation';
import MaterialInformation from './ModalComponents/MaterialInformation';

import { getDayNumber } from '../../functions/nonModuleFunctions';
import { getFarmable } from '../../functions/enkaFunctions';

import CharacterListModal from './ModalLists/CharacterListModal';
import WeaponListModal from './ModalLists/WeaponListModal';
import ArtifactListModal from './ModalLists/ArtifactListModal';
import { PageContext } from "../PageContext";

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
        loadData();
    }, [])

    async function loadData(){
        let calendarData = await window.api.storeGet({ file: "user", item: "calendarList" });
        setList(calendarData);

        let char = await window.api.storeGet({ file: "genshin", item: "charData" });
        setCharData(char);

        let weapon = await window.api.storeGet({ file: "genshin", item: "weaponData" });
        setWeaponData(weapon);

        let artifact = await window.api.storeGet({ file: "genshin", item: "artifactsData" });
        setArtifactData(artifact);

        let boss = await window.api.storeGet({ file: "genshin", item: "bossData" });
        setBossData(boss);

        let farm = await window.api.storeGet({ file: "genshin", item: "materialData" });
        setFarmData(farm);
    }

    const[list, setList] = useState([]);
    const[charData, setCharData] = useState([]);
    const[weaponData, setWeaponData] = useState([]);
    const[artifactData, setArtifactData] = useState([]);
    const[bossData, setBossData] = useState([]);
    const[farmData, setFarmData] = useState([]);

    useEffect(() => {
        if(farmData != []){

            const dayNumber = getDayNumber(day);

            const farmable = getFarmable(dayNumber, list, charData, weaponData, artifactData, farmData, bossData);

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
            setFC(characters);
            setFW(weapons);
            setFA(artifacts);

            setTop(top);
        }
    }, [farmData]);

    const[farmableChar, setFC] = useState(null);
    const[farmableWeapon, setFW] = useState(null);
    const[farmableArtifact, setFA] = useState(null);
    const[top, setTop] = useState({ type: "empty" })

    const {
        theme
    } = useContext(PageContext);

    function close(){
        setModalType(null);
        modalOpen(false);
    }

    return(
        <Backdrop handleClick={ modalOpen } setModalType={ setModalType }>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="bg-lightBG dark:bg-darkBGTwo w-[80%] h-[75%] mt-[84px] rounded-xl overflow-hidden"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
            {/* Heading Div */}
            <div className='bg-lightBGTwo dark:bg-darkBG w-full h-[15%] inline-block drop-shadow-md'>
                <h1 className="text-lightFont dark:text-darkFont text-3xl font-merri float-left mt-[1%] mx-[1%]"> {day} </h1>
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
                <div className="w-full h-[35%] rounded-xl overflow-hidden bg-lightBGTwo dark:bg-darkBG flex flex-row mb-2 drop-shadow-md">
                    <div className="bg-lightSecondary dark:bg-darkSecondary p-3 w-fit h-fit rounded-br-xl">
                        <h2 className="text-lg text-lightFontTwo dark:text-darkFont font-merri">Your top priority today:</h2>
                    </div>

                    <div className="w-[70%] h-[90%] bg-lightSecondary dark:bg-darkSecondary p-2 my-auto mx-auto flex flex-row rounded-xl">
                        {(top["type"] == "empty") &&
                            <EntityInformation name="Your Calendar is empty" imageSrc={"https://i.ds.at/MxdaKg/rs:fill:750:0/plain/2021/07/29/572c4830-721d-11eb-bb63-96959c3b62f2.jpg"} />
                        }

                        {(top["type"] == "character") &&
                        <>
                            <EntityInformation name={top["charName"]} imageSrc={top["charUrl"]} />
                            {(top["talentId"] != false) ? <MaterialInformation matId={top["talentId"]} matType="talent" imageSrc={top["talentUrl"]} data={farmData}/> : <MaterialInformation matId={top["bossId"]} matType="boss" imageSrc={top["bossUrl"]} data={bossData}/>}
                        </>}

                        {(top["type"] == "weapon") &&
                        <>
                            <EntityInformation name={top["weaponName"]} imageSrc={top["weaponUrl"]} />
                            <MaterialInformation matId={top["material"]} matType={top["type"]} imageSrc={top["materialUrl"]} top={top} data={farmData}/>
                        </>}

                        {(top["type"] == "artifact") &&
                        <>
                            <EntityInformation name={top["artifactName"]} imageSrc={top["artifactUrl"]} />
                        </>}
                    </div>
                    
                </div>

                {/* Rest */}
                <div className="w-full h-[65%] flex flex-row">
                    <div className={`w-[32%] h-full bg-lightBGTwo dark:bg-darkBG rounded-xl drop-shadow-md flex flex-col overflow-auto ${theme === 'dark' ? 'darkScroll' : 'lightScroll'}`}>
                        <h2 className="text-lightFont dark:text-darkFont font-merri text-lg text-center py-1">Other Characters</h2>
                        {(farmableChar != null) && <CharacterListModal characters={farmableChar} farmData={farmData} bossData={bossData}/>}
                    </div>
                    
                    <div className={`w-[32%] mx-auto h-full bg-lightBGTwo dark:bg-darkBG rounded-xl drop-shadow-md flex flex-col overflow-auto ${theme === 'dark' ? 'darkScroll' : 'lightScroll'}`}>
                        <h2 className="text-lightFont dark:text-darkFont font-merri text-lg text-center py-1">Other Weapons</h2>
                        {(farmableWeapon != null) && <WeaponListModal weapons={farmableWeapon} data={farmData} weaponData={weaponData}/>}
                    </div>

                    <div className={`w-[32%] h-full bg-lightBGTwo dark:bg-darkBG rounded-xl drop-shadow-md flex flex-col overflow-auto ${theme === 'dark' ? 'darkScroll' : 'lightScroll'}`}>
                        <h2 className="text-lightFont dark:text-darkFont font-merri text-lg text-center py-1">Other Artifacts</h2>
                        {(farmableArtifact != null) && <ArtifactListModal artifacts={farmableArtifact}/>}
                    </div>
                </div>
            </div>
            </motion.div>
        </Backdrop>
    );
}