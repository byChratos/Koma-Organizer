import React from 'react'

import data from "../../data/weapons.json"
import GenshinImage from "../GenshinImage";

export default function WeaponList({ input, handleClick }) {

    const filteredData = data.filter((el) => {
        if(input === null){
            return el;
        }else{
            return el.name.toLowerCase().includes(input.toLowerCase())
        }
    })

    return(
        <ul className='w-full h-full list-none rounded-[20px]'>
            {filteredData.map((item) => (
                <button key={item.id} className="bg-gray-400 w-full text-left flex rounded-l-lg my-2 ml-1 overflow-hidden" onClick={() => { handleClick(item.name) }}> <GenshinImage objectKey={item.key} objectType="weapon" imageType="icon" width="50" height="50"/> <li className='text-white w-full h-[50px] ml-[30px]' key={item.id}>{item.name}</li> </button>
            ))}
        </ul>
    );
}