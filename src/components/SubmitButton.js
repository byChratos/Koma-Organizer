import React from "react";
const { ipcRenderer } = window.require("electron");

export default function SubmitButton({ selectedCharacter, selectedWeapon, selectedArtifact }){

    function button() {
        // TODO Load save + add selection to file

        //* Load current content of calendar.js
        const filePath = "./calendar.js";
        ipcRenderer.send('loadFile', filePath);
    };

    ipcRenderer.on('wroteFile', (event, success) => {
        if(success){
            // TODO Show success
        }else{
            // TODO Show no success
        }
    });

    //* Triggers when reply comes from loading the file
    ipcRenderer.on('loadedFile', (event, success, data) => {
        console.log("trigger");
        const filePath = "./calendar.json";
        if(success){
            if(selectedCharacter != null){
                let charLine = {
                    type: "character",
                    name: selectedCharacter,
                }
                data.push(charLine);
            }
            if(selectedWeapon != null){
                let weaponLine = {
                    type: "weapon",
                    name: selectedWeapon,
                }
                data.push(weaponLine);
            }
            if(selectedArtifact != null){
                let artifactLine = {
                    type: "artifact",
                    name: selectedArtifact, 
                }
                data.push(artifactLine);
            }

            ipcRenderer.send('writeFile', filePath, data);
        }else{
            //TODO Show error
        }
    })

    return (

        <div className="bg-gray-500 hover:bg-gradient-to-r from-green-400 to-green-200 rounded-[25px] w-[100px] h-[50px] cursor-pointer hover:shadow-md hover:shadow-green-500">

                <button className='bg-gray-800 text-white rounded-[25px] w-[94px] h-[44px] ml-[3px] mt-[3px]' onClick={() => { button() }}>Add to Calendar</button>
            
        </div>

    );
}