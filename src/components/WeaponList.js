import React from 'react'

import data from "../data/weapons.json"
import WeaponIcon from './WeaponIcon';

export default function WeaponList(props) {

    const filteredData = data.filter((el) => {
        if(props.input === ''){
            return el;
        }else{
            return el.text.toLowerCase().includes(props.input.toLowerCase())
        }
    })

    return (
        <ul className='weaponList'>
            {filteredData.map((item) => (
                <li key={item.id}> <WeaponIcon type="icon" weapon={ item.text } height="100" width="100" /> </li>
            ))}
        </ul>
    )
}