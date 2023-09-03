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


    return(
        <div className="minW:w-[300px] minW:h-[300px] mdW:w-[400px] mdW:h-[400px] rounded-xl flex flex-col items-center justify-center bg-[#222831]">
            <img className="" src={getAssetById(type, id, imgType)} width="400" height="400"/>
        </div>
    );
}