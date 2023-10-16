import React, { useState, useEffect } from "react";

import { getCharIdByName, getArtifactIdByName, getWeaponIdByName } from "../functions/nonModuleFunctions";
import { getAssetById } from "../functions/enkaFunctions";

export default function DisplayCard({name, type}) {

    useEffect(() => {
        loadData();
    }, []);

    async function loadData(){
        
        if(type == "character"){
            let tmpData = await window.api.storeGet({ file: "genshin", item: "charData" });
            setData(tmpData);
            getId(tmpData);
        }else if(type == "weapon"){
            let tmpData = await window.api.storeGet({ file: "genshin", item: "weaponData" });
            setData(tmpData);
            getId(tmpData);
        }else{
            let tmpData = await window.api.storeGet({ file: "genshin", item: "artifactsData" });
            setData(tmpData);
            getId(tmpData);
        }
    }

    function getId(tmp){
        if(type == "character"){
            let id = getCharIdByName(name, tmp);
            setId(id);
        }else if(type == "weapon"){
            let id = getWeaponIdByName(name, tmp);
            setId(id);
        }else{
            let id = getArtifactIdByName(name, tmp);
            setId(id);
        }
    }

    const[data, setData] = useState([]);
    const[id, setId] = useState(null);

    async function log(){
        await window.api.log({ message: data })
    }

    //log();

    return(
        <div className="minW:w-[300px] minW:h-[300px] mdW:w-[400px] mdW:h-[400px] rounded-xl flex flex-col items-center justify-center bg-lightBG dark:bg-darkBG">
            <img className="" src={ getAssetById(type, id, "icon", data) } width="400" height="400"/>
        </div>
    );
}