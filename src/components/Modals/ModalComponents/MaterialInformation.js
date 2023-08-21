import React from "react";
import { twMerge } from "tailwind-merge";

import { getMaterialNameById } from "../../../functions/nonModuleFunctions";

export default function MaterialInformation({ className, matId, matType, imageSrc, top}) {

    let materialName = getMaterialNameById(matType, matId);

    return(
        <div className="w-[600px] mx-[1%]">
            <div className={twMerge('bg-gray-600 w-full h-[95%] mt-[1.25%] rounded-lg', className)}>
                <div className='w-[50px] h-[50px] rounded-full bg-black'>
                    <img className="object-cover relative inline-block float-left rounded-full" src={imageSrc} width="50" height="50"/>
                </div>
                <h1 className="text-white float-left text-lg"> {materialName} </h1>
            </div>
        </div>
    );
}