import React from 'react'

import data from "../../data/characters.json"
import GenshinImage from '../GenshinImage';

export default function CharacterList({ input, onButtonClick}) {

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
                <li className="inline-block w-24 h-24" key={item.id}> <button key={ item.text.toLowerCase() } onClick={() => { onButtonClick(item.text.toLowerCase()) }}><GenshinImage objectName={ item.text } objectType="characters" imageType="icon-big" height="100" width="100" /></button> </li>
            ))}
        </ul>
    )
}