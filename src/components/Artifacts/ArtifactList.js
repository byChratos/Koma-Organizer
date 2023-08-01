import React from 'react'

import data from "../../data/artifacts.json"
import GenshinImage from '../GenshinImage';

export default function ArtifactList(props) {

    const filteredData = data.filter((el) => {
        if(props.input === ''){
            return el;
        }else{
            return el.text.toLowerCase().includes(props.input.toLowerCase())
        }
    })

    return (
        <ul className='list-none mt-5/1 text-center'>
            {filteredData.map((item) => (
                <li className="inline-block w-24 h-24" key={item.id}> <GenshinImage objectName={ item.text } objectType="artifacts" imageType="flower-of-life" width="100" height="100" /> </li>
            ))}
        </ul>
    )
}