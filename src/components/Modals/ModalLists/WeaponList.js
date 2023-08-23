import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import FarmableMaterial from "../ModalComponents/FarmableMaterial";

export default function WeaponList({ className, weapon }) {
    const[isOpen, setIsOpen] = useState(false);

    function handleClick() {
        setIsOpen(!isOpen);
    }

    return(
        <button className={(isOpen) ? twMerge("bg-blue-400 hover:bg-blue-500 w-[95%] h-[150px]", className) : twMerge("bg-blue-400 hover:bg-blue-500 w-[95%] h-[50px] overflow-hidden", className)} onClick={() => handleClick()}>
            <div className="w-full h-full flex flex-col">
                {/* Header */}
                <div className="w-full h-[50px] flex-1">
                    <img className="object-cover inline-block float-left" src={weapon["weaponUrl"]} width="50" height="50"/>
                    <h1 className="text-black flaot-left"> {weapon["weaponName"]} </h1>
                </div>
                {/* Body */}
                {(isOpen) && <div className="w-full h-[100px] p-[3%] bg-red-100 rounded-b-md grid grid-rows-2 grid-cols-1 gap-3">
                    <FarmableMaterial className="row-start-1 row-span-2 col-start-1" type="weapon" materialImgUrl={weapon["materialUrl"]} materialId={weapon["material"]} />
                </div>}
            </div>
        </button>
    );
}