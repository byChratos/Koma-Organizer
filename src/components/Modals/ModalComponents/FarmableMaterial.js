import React from "react";
import { twMerge } from "tailwind-merge";
import { getMaterialNameById } from "../../../functions/nonModuleFunctions";

export default function FarmableMaterial({ className, materialId, materialImgUrl, type }){

    let materialName = getMaterialNameById(type, materialId);

    return(
        <div className={twMerge("w-full h-full bg-gray-600 rounded flex", className)}>
            {/* Image */}
            <div className="h-full w-[20%] flex-1">
                <img src={materialImgUrl} width="50" height="50" />
            </div>
            {/* Name */}
            <div className="h-full w-[80%]">
                <p className="text-white text-md"> {materialName} </p>
            </div>
        </div>
    );
}