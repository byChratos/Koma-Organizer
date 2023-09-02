import React from "react";

import { getCharIdByName, getArtifactIdByName, getWeaponIdByName } from "../functions/nonModuleFunctions";
import { getAssetById } from "../functions/enkaFunctions";

export default function DisplayCard({name, type}) {

    let id;
    if(type == "character"){
        id = getCharIdByName(name);
    }else if(type == "weapon"){
        id = getWeaponIdByName(name);
    }else{
        id = getArtifactIdByName(name);
    }

    let imgType = "icon";
    if(type == "character") imgType = "splash";


    return(
        <div className="w-[400px] h-fit rounded-xl flex flex-col items-center justify-center">
            <div className="w-[400px] h-[300px] overflow-hidden">
                <img className="object-cover absolute top-0 left-0 w-full h-full z-10" src={getAssetById(type, id, imgType)} width="1000" height="1000"/>
            </div>
        </div>
    );
}