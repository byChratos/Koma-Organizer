import React, { useState, useEffect } from 'react'
import { getAssetById } from '../../functions/enkaFunctions';
import ListToggle from '../Modals/ModalLists/ListToggle';
import { motion, AnimatePresence } from 'framer-motion';

export default function CharacterList({ input, handleClick, filters }) {

    const elements = ["Anemo", "Cryo", "Dendro", "Electro", "Geo", "Hydro", "Pyro"];

    useEffect(() => {
        loadCharacters();
    }, []);

    useEffect(() => {
        searchLogic();
    }, [input]);

    useEffect(() => {
        if(data.length != 0){
            let newList = [];

            for(const element of elements){
                var thisElementList = data.filter(d => d.element === element);

                if(filters.character.fourStars && !filters.character.fiveStars){
                    thisElementList = thisElementList.filter(d => d.stars == 4);
                }else if(!filters.character.fourStars && filters.character.fiveStars){
                    thisElementList = thisElementList.filter(d => d.stars == 5);
                }else if(!filters.character.fourStars && !filters.character.fiveStars){
                    thisElementList = [];
                }

                console.log(thisElementList);

                newList.push(thisElementList);
            }

            setElementList(newList);
        }
    }, [filters]);

    async function loadCharacters(){
        let tmpData = await window.api.storeGet({ file: "genshin", item: "charData" });
        setData(tmpData);

        let filtered = tmpData.filter((el) => {
            if(input === null){
                return el;
            }else{
                return el.name.toLowerCase().includes(input.toLowerCase())
            }
        });
        setFilteredData(filtered);

        let elementLists = [];

        const anemo = filtered.filter(d => d.element === "Anemo");
        elementLists.push(anemo);

        const cryo = filtered.filter(d => d.element === "Cryo");
        elementLists.push(cryo);

        const dendro = filtered.filter(d => d.element === "Dendro");
        elementLists.push(dendro);

        const electro = filtered.filter(d => d.element === "Electro");
        elementLists.push(electro);

        const geo = filtered.filter(d => d.element === "Geo");
        elementLists.push(geo);

        const hydro = filtered.filter(d => d.element === "Hydro");
        elementLists.push(hydro);

        const pyro = filtered.filter(d => d.element === "Pyro");
        elementLists.push(pyro);

        setElementList(elementLists);
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

    const[data, setData] = useState([]);
    const[filteredData, setFilteredData] = useState([]);

    const[elementList, setElementList] = useState([]);
    const[listOpen, setListOpen] = useState({ "Anemo": true, "Cryo": true, "Dendro": true, "Electro": true, "Geo": true, "Hydro": true, "Pyro": true});

    return(
        <>
            {(input == null || input == "") ?
                <>
                    {elementList.map((list, index) => (
                        <div className="flex flex-col p-2" key={elements[index]}>
                            <div className="w-full h-[50px] bg-lightSecondary dark:bg-darkSecondary drop-shadow-md rounded-lg flex flex-row items-center px-3">
                                <h2 className="text-lightFontTwo dark:text-darkFont font-merri text-xl">{elements[index]}</h2>
                                <button 
                                    className="ml-auto rounded-xl bg-lightSecondary hover:bg-lightPrimary dark:bg-darkSecondary dark:hover:bg-darkPrimary"
                                    onClick={ () => { setListOpen((prevListOpen) => ({
                                        ...prevListOpen,
                                        [elements[index]]: !prevListOpen[elements[index]],
                                    })) } }>
                                        <ListToggle 
                                            width="40" height="40"
                                            isOpen={listOpen[elements[index]]}
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
                                    animate={listOpen[elements[index]] ? "open" : "closed"}
                                    exit="closed"
                                >
                                    {list.map((item) => (
                                        <button key={item.id} 
                                            className="bg-lightBGTwo dark:bg-darkBG hover:bg-lightPrimary dark:hover:bg-darkPrimary w-[150px] h-[200px] mx-2 text-left flex flex-col rounded-lg my-2 overflow-hidden drop-shadow-md items-center" 
                                            onClick={() => { handleClick(item.name, "character") }}
                                        >
                                            <img className="object-cover inline-block relative" src={ getAssetById("character", item.id, "icon", data) } width="150" height="150" />
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
                                onClick={() => { handleClick(item.name, "character") }}
                            >
                                <img className="object-cover inline-block relative" src={ getAssetById("character", item.id, "icon", data) } width="150" height="150" />
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