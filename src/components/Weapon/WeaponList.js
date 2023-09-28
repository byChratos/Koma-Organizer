import React, { useState, useEffect } from 'react'
import { getAssetById } from '../../functions/enkaFunctions';

export default function WeaponList({ input, handleClick }) {

    useEffect(() => {
        loadWeapons();
    }, []);

    useEffect(() => {
        searchLogic();
    }, [input]);

    async function loadWeapons(){
        let tmpData = await window.api.storeGet({ item: "weaponData" });
        setData(tmpData);

        let filtered = tmpData.filter((el) => {
            if(input === null){
                return el;
            }else{
                return el.name.toLowerCase().includes(input.toLowerCase())
            }
        });
        setFilteredData(filtered);
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

    return(
        <ul className='w-full h-full list-none px-2 py-2 flex flex-wrap mx-auto'>
            {filteredData.map((item) => (
                <button key={item.id}
                    className="bg-lightBGTwo dark:bg-darkBG hover:bg-lightPrimary dark:hover:bg-darkPrimary w-[150px] h-[225px] mx-2 text-left flex flex-col rounded-lg my-2 overflow-hidden drop-shadow-md items-center"
                    onClick={() => { handleClick(item.name, "weapon") }}
                >
                    <img className="object-cover inline-block relative" src={ getAssetById("weapon", item.id, "icon", data) } width="150" height="150" />
                    <p className="w-[150px] h-[75px] text-lightFont dark:text-darkFont font-merri text-lg text-center">
                        {item.name}
                    </p>
                </button>
            ))}
        </ul>
    );
}