import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import PopUp from '../components/Modals/PopUp';
import { getAssetById } from "../functions/enkaFunctions";
import { PageContext } from "../components/PageContext";

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
        loadCalendar();
        loadData();
    }, []);

    async function loadCalendar(){
        let calendarData = await window.api.storeGet({ file: "user", item: "calendarList" });
        setList(calendarData);
        setChanges(false);
    }

    async function loadData(){
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

    async function saveCalendar(){
        const response = await window.api.storeSet({ file: "user", item: "calendarList", value: list });
        if(response){
            setSaved(true);
            setChanges(false);
            window.api.log({ message: "PRIORITY: Saved changes" });
        }
    }

    const[list, setList] = useState([]);
    const[charData, setCharData] = useState([]);
    const[weaponData, setWeaponData] = useState([]);
    const[artifactData, setArtifactData] = useState([]);
    const[bossData, setBossData] = useState([]);
    const[farmData, setFarmData] = useState([]);

    const[changes, setChanges] = useState(false);
    const[saved, setSaved] = useState(false);

    const {
        theme
    } = useContext(PageContext);

    function swapListAtIndex(index, type){
        const updatedList = [...list];
        if(type == "boss"){
            updatedList[index] = { ...updatedList[index], boss: (!updatedList[index]["boss"]) }
        }else{
            updatedList[index] = { ...updatedList[index], talents: (!updatedList[index]["talents"]) }
        }
        setList(updatedList);
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

            {(saved) && <PopUp message="Successfully saved" setModalOpen={setSaved} closeEnabled={true} />}

            {/* <h2 className='text-gray-100'>Sort your Characters, Weapons and Artifacts by priority! Highest priority available to farm will be displayed first</h2> */}
            
            {/* Content */}
            <div className="w-full h-[120px] flex flex-row">
                <div className="w-[302px] h-[100px] bg-lightBGTwo dark:bg-darkBGTwo rounded-t-xl flex-none flex flex-row items-center px-5 mt-5 ml-[5%]">
                    <motion.button
                        className={`w-[125px] h-[75px] text-black font-merri font-lg rounded-lg drop-shadow-md ${changes ? 'text-black bg-green-500' : 'text-lightFont dark:text-darkFont'}`} onClick={() => saveCalendar()}
                        variants={buttons}
                        initial="small"
                        whileHover="hover"
                        whileTap="tap"
                        disabled={!changes}
                    >SAVE</motion.button>
                    <motion.button
                        className={`w-[125px] h-[75px] text-black font-merri font-lg rounded-lg ml-3 drop-shadow-md ${changes ? 'text-black bg-red-500' : 'text-lightFont dark:text-darkFont'}`} onClick={() => loadCalendar()}
                        variants={buttons}
                        initial="small"
                        whileHover="hover"
                        whileTap="tap"
                        disabled={!changes}
                    >CANCEL</motion.button>
                </div>

                <motion.div className="w-[250px] h-[40px] mt-[80px] ml-5 rounded-t-xl bg-lightBGTwo dark:bg-darkBGTwo flex items-center" variants={divVars} animate={changes ? 'animate' : 'initial'}>
                    <p className="w-full text-lightFont dark:text-darkFont font-merri text-center">You have unsaved changes!</p>
                </motion.div>
            </div>
            <div className={`w-[90%] h-fit bg-lightBGTwo dark:bg-darkBGTwo rounded-b-xl rounded-tr-xl drop-shadow-md items-center flex flex-col ml-[5%] p-5 overflow-x-hidden overflow-y-auto ${theme === 'dark' ? 'darkScroll' : 'lightScroll'}`}>
                <div className="w-full">
                    {list.map((item, index) => (
                        <motion.div key={item["id"]}
                            className="bg-lightPrimary dark:bg-darkPrimary w-full h-[70px] rounded-xl my-2 flex flex-row overflow-hidden drop-shadow-sm"
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
                                    <div className="w-[72px] h-[70px] bg-lightSecondary dark:bg-darkSecondary overflow-hidden">
                                        {item["type"] == "character" && <img src={ getAssetById(item["type"], item["id"], "icon", charData )} width="70" height="70"/>}
                                        {item["type"] == "weapon" && <img src={ getAssetById(item["type"], item["id"], "icon", weaponData )} width="70" height="70"/>}
                                        {item["type"] == "artifact" && <img src={ getAssetById(item["type"], item["id"], "icon", artifactData )} width="70" height="70"/>}
                                    </div>
                                    <div className="w-[330px] h-full flex items-center ml-2">
                                        <div className="w-fit h-fit rounded-lg hover:bg-lightSecondary dark:hover:bg-darkSecondary py-2 px-2">
                                            <p className="w-fit text-left font-merri text-lg text-lightFontTwo dark:text-darkFont select-text selection:bg-lightBGTwo dark:selection:text-darkFont selection:text-lightFont dark:selection:bg-darkBGTwo">{item["name"]}</p>
                                        </div>
                                    </div>
                                </div>
                                {(item["type"] == "character") && <div className="minW:w-[165px] mdW:w-[400px] h-full select-none flex items-center">
                                    <motion.div className="bg-lightSecondary dark:bg-darkSecondary minW:w-[60px] mdW:w-[187.5px] h-[60px] cursor-pointer rounded-lg" onClick={() => {swapListAtIndex(index, "boss"); setChanges(true)}} variants={buttons} initial="small" whileHover="hover2">
                                        <div className={`flex flex-row ${list[index]["boss"] == false ? 'grayscale' : 'grayscale-0'}`}>
                                            <img src={ getAssetById("bossMaterial", list[index]["bossId"], "icon", bossData )} width="60" height="60" />
                                            <div className="mdW:flex minW:hidden h-[60px] items-center">
                                                <p className={`text-lightFontTwo dark:text-darkFont font-merri ${list[index]["boss"] == false ? 'line-through decoration-2 decoration-gray-400' : 'no-underline'}`}>BOSS</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                    <motion.div className="bg-lightSecondary dark:bg-darkSecondary minW:w-[60px] mdW:w-[187.5px] h-[60px] ml-[25px] cursor-pointer rounded-lg" onClick={() => {swapListAtIndex(index, "talents"); setChanges(true)}} variants={buttons} initial="small" whileHover="hover2">
                                        <div className={`flex flex-row ${list[index]["talents"] == false ? 'grayscale' : 'grayscale-0'}`}>
                                            <img src={ getAssetById("material", list[index]["talentsId"], "icon", farmData )} width="60" height="60" />
                                            <div className="mdW:flex minW:hidden h-[60px] items-center">
                                                <p className={`text-lightFontTwo dark:text-darkFont font-merri ${list[index]["talents"] == false ? 'line-through decoration-2 decoration-gray-400' : 'no-underline'}`}>TALENTS</p>
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