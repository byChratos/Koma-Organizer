import React, { useState, useEffect } from 'react'
import { getAssetById } from '../../functions/enkaFunctions';
import ListToggle from '../Modals/ModalLists/ListToggle';
import { motion, AnimatePresence } from 'framer-motion';

export default function WeaponList({ input, handleClick, filters }) {

    const weaponTypeNames = ["Bow", "Catalyst", "Claymore", "Polearm", "Sword"];
    const weaponTypes = ["WEAPON_BOW", "WEAPON_CATALYST", "WEAPON_CLAYMORE", "WEAPON_POLE", "WEAPON_SWORD_ONE_HAND"];

    const vars = {
        closed: {
            height: 0,
            opacity: 0,
            scale: 0,
            transition: {
                height: { type: "tween", duration: 0.3 },
                scale: { duration: 0, delay: 0.3 },
            }
        },
        open: {
            height: "auto",
            opacity: 1,
            scale: 1,
            transition: {
                height: { type: "tween", duration: 0.3 },
                scale: { duration: 0 },
            }
        }
    }

    useEffect(() => {
        loadWeapons();
    }, []);

    useEffect(() => {
        searchLogic();
    }, [input]);

    useEffect(() => {
        if(data.length != 0){
            let newList = [];

            for(const type of weaponTypes){
                var thisTypeList = [];
                var selectedStars = [];

                if(filters.weapon.oneStars){
                    selectedStars.push(1);
                }
                if(filters.weapon.twoStars){
                    selectedStars.push(2);
                }
                if(filters.weapon.threeStars){
                    selectedStars.push(3);
                }
                if(filters.weapon.fourStars){
                    selectedStars.push(4);
                }
                if(filters.weapon.fiveStars){
                    selectedStars.push(5);
                }
                
                thisTypeList = data.filter(d => d.weaponType == type)
                                    .filter(d => selectedStars.includes(d.stars));

                newList.push(thisTypeList);
            }

            setTypesList(newList);
        }
    }, [filters]);

    async function loadWeapons(){
        let tmpData = await window.api.storeGet({ file: "genshin", item: "weaponData" });
        setData(tmpData);

        let filtered = tmpData.filter((el) => {
            if(input === null){
                return el;
            }else{
                return el.name.toLowerCase().includes(input.toLowerCase())
            }
        });
        setFilteredData(filtered);

        let types = [];

        const bows = filtered.filter(d => d.weaponType == "WEAPON_BOW");
        types.push(bows);

        const catalysts = filtered.filter(d => d.weaponType == "WEAPON_CATALYST");
        types.push(catalysts);

        const claymores = filtered.filter(d => d.weaponType == "WEAPON_CLAYMORE");
        types.push(claymores);

        const polearms = filtered.filter(d => d.weaponType == "WEAPON_POLE");
        types.push(polearms);

        const swords = filtered.filter(d => d.weaponType == "WEAPON_SWORD_ONE_HAND");
        types.push(swords);

        setTypesList(types);
    }

    function searchLogic(){
        let filtered = data.filter((el) => {
            if(input === null){
                return el;
            }else{
                return el.name.toLowerCase().includes(input.toLowerCase())
            }
        });
        setFilteredData(filtered);
    }

    const[data, setData] = useState([]);
    const[filteredData, setFilteredData] = useState([]);

    const[typesList, setTypesList] = useState([]);
    const[listOpen, setListOpen] = useState({ "Bow": true, "Catalyst": true, "Claymore": true, "Polearm": true, "Sword": true });

    return(
        <>
            {(input == null || input == "") ?
                <>
                    {typesList.map((list, index) => (
                        <div className="flex flex-col p-2" key={weaponTypeNames[index]}>
                            <div className="w-full h-[50px] bg-lightSecondary dark:bg-darkSecondary drop-shadow-md rounded-lg flex flex-row items-center px-3">
                                <h2 className="text-lightFontTwo dark:text-darkFont font-merri text-xl">{weaponTypeNames[index]}</h2>
                                <button className="ml-auto" onClick={ () => { setListOpen((prevListOpen) => ({
                                        ...prevListOpen,
                                        [weaponTypeNames[index]]: !prevListOpen[weaponTypeNames[index]],
                                    })) } }>
                                        <ListToggle 
                                            width="40" height="40"
                                            isOpen={listOpen[weaponTypeNames[index]]}
                                            color="#ffffff"
                                            strokeWidth="4"
                                            lineProps={{ strokeLinecap: "round" }}
                                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                        />
                                </button>
                            </div>
                            <AnimatePresence>
                            <motion.ul 
                                className="w-full h-full list-none px-2 py-2 flex flex-wrap mx-auto"
                                variants={vars}
                                initial="open"
                                animate={listOpen[weaponTypeNames[index]] ? "open" : "closed"}
                                exit="closed"
                            >
                                {list.map((item) => (
                                    <button key={item.id} 
                                        className="bg-lightBGTwo dark:bg-darkBG hover:bg-lightPrimary dark:hover:bg-darkPrimary w-[150px] h-[200px] mx-2 text-left flex flex-col rounded-lg my-2 overflow-hidden drop-shadow-md items-center" 
                                        onClick={() => { handleClick(item.name, "weapon") }}
                                    >
                                        <img className="object-cover inline-block relative" src={ getAssetById("weapon", item.id, "icon", data) } width="150" height="150" />
                                        <p className="w-[150px] h-[50px] text-lightFont dark:text-darkFont font-merri text-lg text-center">
                                            {item.name}
                                        </p>
                                    </button>
                                ))}
                            </motion.ul>
                            </AnimatePresence>
                        </div>
                    ))}
                </> 
            :
                <>
                    <ul className='w-full h-full list-none px-2 py-2 flex flex-wrap mx-auto'>
                        {filteredData.map((item) => (
                            <button key={item.id} 
                                className="bg-lightBGTwo dark:bg-darkBG hover:bg-lightPrimary dark:hover:bg-darkPrimary w-[150px] h-[200px] mx-2 text-left flex flex-col rounded-lg my-2 overflow-hidden drop-shadow-md items-center" 
                                onClick={() => { handleClick(item.name, "weapon") }}
                            >
                                <img className="object-cover inline-block relative" src={ getAssetById("weapon", item.id, "icon", data) } width="150" height="150" />
                                <p className="w-[150px] h-[50px] text-lightFont dark:text-darkFont font-merri text-lg text-center">
                                    {item.name}
                                </p>
                            </button>
                        ))}
                    </ul>
                </>
            }
        </>
    );
}