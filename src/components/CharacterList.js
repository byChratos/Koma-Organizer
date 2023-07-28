import React from 'react'
import data from "./charList.json"

import CharIcon from './CharIcon';

export default function CharacterList(props) {

    const filteredData = data.filter((el) => {
        if(props.input === ''){
            return el;
        }else{
            return el.text.toLowerCase().includes(props.input.toLowerCase())
        }
    })

    return (
        <ul className='charList'>
            {filteredData.map((item) => (
                <li key={item.id}> <CharIcon type="icon" character={ item.text } height="100" width="100" /> </li>
            ))}
        </ul>
    )
}