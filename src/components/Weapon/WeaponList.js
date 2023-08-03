import React from 'react'

import data from "../../data/weapons.json"

export default function WeaponList({ input, handleClick }) {

    const filteredData = data.filter((el) => {
        if(input === null){
            return el;
        }else{
            return el.text.toLowerCase().includes(input.toLowerCase())
        }
    })

    return(
        <ul className='w-full h-full list-none rounded-[20px]'>
            {filteredData.map((item) => (
                <button key={item.id} className="w-full text-left" onClick={() => { handleClick(item.text) }}> <li className='text-white w-full h-[50px] ml-[30px]' key={item.id}>{item.text}</li> </button>
            ))}
        </ul>
    );
}