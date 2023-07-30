import React from 'react'

import data from "../../data/characters.json"
import CharIconButton from './CharIconButton';

export default function CharacterList({ input, onButtonClick}) {

    const filteredData = data.filter((el) => {
        if(input === ''){
            return el;
        }else{
            return el.text.toLowerCase().includes(input.toLowerCase())
        }
    })

    return (
        <ul className='charList'>
            {filteredData.map((item) => (
                <li key={item.id}> <CharIconButton type="icon-big" character={ item.text } height="100" width="100" onButtonClick={ onButtonClick } /> </li>
            ))}
        </ul>
    )
}