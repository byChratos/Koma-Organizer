import React from 'react'

import data from "../data/artifacts.json"
import ArtifactIcon from './ArtifactIcon';

export default function ArtifactList(props) {

    const filteredData = data.filter((el) => {
        if(props.input === ''){
            return el;
        }else{
            return el.text.toLowerCase().includes(props.input.toLowerCase())
        }
    })

    return (
        <ul className='artifactList'>
            {filteredData.map((item) => (
                <li key={item.id}> <ArtifactIcon type="flower-of-life" artifact={ item.text } height="100" width="100" /> </li>
            ))}
        </ul>
    )
}