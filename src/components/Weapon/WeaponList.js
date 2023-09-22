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
        <ul className='w-full h-full list-none px-2'>
            {filteredData.map((item) => (
                <button key={item.id}
                    className="bg-[#222831] hover:bg-[#00ADB5] w-full h-[50px] text-left flex flex-row rounded-lg my-2 overflow-hidden drop-shadow-md items-center"
                    onClick={() => { handleClick(item.name, "weapon") }}
                >
                    <img className="object-cover inline-block relative" src={ getAssetById("weapon", item.id, "icon", data) } width="50" height="50" />
                    <p className="text-white font-merri text-lg">
                        {item.name}
                    </p>
                </button>
            ))}
        </ul>
    );
}