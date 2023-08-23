import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import FarmableMaterial from "../ModalComponents/FarmableMaterial";

export default function CharList({ className, char }) {

    const[isOpen, setIsOpen] = useState(false);
    let talentStyle, bossStyle = "";

    if(char["bossId"] == false){
        talentStyle = "row-start-1 row-span-2 col-start-1"
    }else if(char["talentId"] == false){
        bossStyle = "row-start-1 row-span-2 col-start-1"
    }


    function handleClick() {
        setIsOpen(!isOpen);
    }

    return(
        <button className={(isOpen) ? twMerge("bg-blue-400 hover:bg-blue-500 w-[95%] h-[200px]", className) : twMerge("bg-blue-400 hover:bg-blue-500 w-[95%] h-[50px] overflow-hidden", className)} onClick={() => handleClick()}>
            <div className="w-full h-full flex flex-col">
                {/* Header */}
                <div className="w-full h-[50px] flex-1">
                    <img className="object-cover inline-block float-left" src={char["charUrl"]} width="50" height="50"/>
                    <h1 className="text-black flaot-left"> {char["charName"]} </h1>
                </div>
                {/* Body */}
                {(isOpen) && <div className="w-full h-[150px] p-[3%] bg-red-100 rounded-b-md grid grid-rows-2 grid-cols-1 gap-3">
                    {(char["talentId"] != false) && <FarmableMaterial className={talentStyle} type="talent" materialImgUrl={char["talentUrl"]} materialId={char["talentId"]} />}
                    {(char["bossId"] != false) && <FarmableMaterial className={bossStyle} type="boss" materialImgUrl={char["bossUrl"]} materialId={char["bossId"]} />}
                </div>}
            </div>
        </button>
    );
}