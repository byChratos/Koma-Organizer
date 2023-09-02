import React from 'react'

import data from "../../data/artifacts.json";
import GenshinImage from "../GenshinImage";


export default function ArtifactList({ input, handleClick }) {

    const filteredData = data.filter((el) => {
        if(input === null){
            return el;
        }else{
            return el.name.toLowerCase().includes(input.toLowerCase())
        }
    })

    return (
        <ul className='w-full h-full list-none px-2'>
            {filteredData.reverse().map((item) => (
                <button key={item.id}
                    className="bg-[#222831] hover:bg-[#00ADB5] w-full h-[50px] text-left flex flex-row rounded-lg my-2 overflow-hidden drop-shadow-md items-center"
                    onClick={() => { handleClick(item.name, "artifact") }}
                >
                    <GenshinImage objectKey={item.key} objectType="artifact" imageType="icon" width="50" height="50"/>
                    <p className="text-white font-merri text-lg">
                        {item.name}
                    </p>
                </button>
            ))}
        </ul>
    )
}