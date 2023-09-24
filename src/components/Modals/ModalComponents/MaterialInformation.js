import React from "react";
import { getMaterialNameById } from "../../../functions/nonModuleFunctions";

export default function MaterialInformation({ matId, matType, imageSrc, top, data}) {

    let materialName = getMaterialNameById(matType, matId, data);

    return(
        <div className="minW:p-2 w-[40%] h-[90%] mdW:p-4 bg-lightPrimary dark:bg-darkPrimary rounded-xl flex flex-row my-auto items-center mx-auto drop-shadow-md">
            <div className="w-fit h-fit bg-lightSecondary dark:bg-darkSecondary rounded-xl overflow-hidden drop-shadow-md">
                <img src={imageSrc} width="75" height="75"/>
            </div>
            <h1 className="text-lightFontTwo dark:text-darkFont font-merri minW:text-md mdW:text-lg minW:p-1 mdW:p-3 hover:bg-lightSecondary dark:hover:bg-darkSecondary selection:bg-lightBGTwo dark:selection:bg-darkBGTwo selection:text-lightFont dark:selection:text-darkFont select-text rounded-2xl ml-4"> {materialName} </h1>
        </div>
    );
}