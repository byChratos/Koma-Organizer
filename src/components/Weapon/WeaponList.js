import React from 'react'

import data from "../../data/weapons.json"
import GenshinImage from '../GenshinImage';

export default function WeaponList({ input, onButtonClick }) {

    const filteredData = data.filter((el) => {
        if(input === ''){
            return el;
        }else{
            return el.text.toLowerCase().includes(input.toLowerCase())
        }
    })

    return (
        <ul className='list-none mt-5/1 text-center'>
            {filteredData.map((item) => (
                <li className="inline-block w-24 h-24" key={item.id}> <button key={item.text.toLowerCase()} onClick={() => { onButtonClick(item.text.toLowerCase())} }><GenshinImage objectName={ item.text } objectType="weapons" imageType="icon" width="100" height="100" /></button> </li>
            ))}
        </ul>
    )
}