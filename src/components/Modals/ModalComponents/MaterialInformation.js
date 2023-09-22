import React from "react";
import { getMaterialNameById } from "../../../functions/nonModuleFunctions";

export default function MaterialInformation({ matId, matType, imageSrc, top, data}) {

    let materialName = getMaterialNameById(matType, matId, data);

    return(
        <div className="minW:p-2 w-[40%] h-[90%] mdW:p-4 bg-[#00ADB5] rounded-xl flex flex-row my-auto items-center mx-auto drop-shadow-md">
            <div className="w-fit h-fit bg-[#1c6569] rounded-xl overflow-hidden drop-shadow-md">
                <img src={imageSrc} width="75" height="75"/>
            </div>
            <h1 className="text-white font-merri minW:text-md mdW:text-lg minW:p-1 mdW:p-3 hover:bg-[#1c6569] selection:bg-[#393E46] select-text rounded-2xl ml-4"> {materialName} </h1>
        </div>
    );
}