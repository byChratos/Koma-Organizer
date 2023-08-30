import React from "react";
//const { ipcRenderer } = window.require("electron");
import { twMerge } from "tailwind-merge";

export default function SubmitButton({ selectedCharacter, selectedWeapon, selectedArtifact, className }){

    async function button() {
        const response = await window.api.saveToFile({selectedArtifact: selectedArtifact, selectedCharacter: selectedCharacter, selectedWeapon: selectedWeapon});
    };

    //TODO Successfully added reply

    return (

        <div className={twMerge("bg-gray-500 hover:bg-gradient-to-r from-green-400 to-green-200 rounded-[25px] w-[100px] h-[50px] mt-[20px] cursor-pointer hover:shadow-md hover:shadow-green-500", className)}>

                <button type="button" className='bg-gray-800 text-white rounded-[25px] w-[99%] h-[44px] ml-[0.5%] mt-[3px]' onClick={() => { button() }}>Add selection to calendar</button>
            
        </div>

    );
}