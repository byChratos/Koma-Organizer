import React from "react";
const { ipcRenderer } = window.require("electron");

export default function SubmitButton({ selectedCharacter, selectedWeapon, selectedArtifact }){

    function button() {
        // TODO Load save + add selection to file
        console.log("button");
        ipcRenderer.send('saveToFile', selectedArtifact, selectedCharacter, selectedWeapon);
    };

    //ipcRenderer.on('savedFile', (event, success) => {
      //  console.log(success);
    //});

    return (

        <div className="bg-gray-500 hover:bg-gradient-to-r from-green-400 to-green-200 rounded-[25px] w-[100px] h-[50px] cursor-pointer hover:shadow-md hover:shadow-green-500">

                <button type="button" className='bg-gray-800 text-white rounded-[25px] w-[94px] h-[44px] ml-[3px] mt-[3px]' onClick={() => { button() }}>Add to Calendar</button>
            
        </div>

    );
}