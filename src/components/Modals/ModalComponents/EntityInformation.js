import React from 'react';

export default function EntityInformation({ name, imageSrc }) {
    return(
        <div className="minW:p-2 w-[40%] h-[90%] mdW:p-4 bg-[#00ADB5] rounded-xl flex flex-row my-auto mx-auto items-center drop-shadow-md">
            <div className="w-fit h-fit bg-[#1c6569] rounded-xl overflow-hidden drop-shadow-md">
                <img src={imageSrc} width="75" height="75"/>
            </div>
            <h1 className="text-white font-merri minW:text-md mdW:text-lg minW:p-1 mdW:p-3 hover:bg-[#1c6569] selection:bg-[#393E46] select-text rounded-2xl ml-4"> {name} </h1>
        </div>
    );
}