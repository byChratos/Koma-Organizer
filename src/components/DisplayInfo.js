import React from "react";

export default function DisplayInfo({name, add, remove}) {
    return(
        <div className="w-[400px] h-fit bg-[#00ADB5] flex flex-col absolute z-20 rounded-xl p-2 items-center justify-center mt-[100px] bg-opacity-70">
            <h1 className="font-merri text-white text-lg select-text selection:bg-[#00ADB5]">{name}</h1>
            <button className="text-white font-merri text-lg h-[75px] w-[300px] hover:bg-green-600 rounded-xl" onClick={() => add()}>
                CONFIRM
            </button>
            <button className="text-white font-merri text-lg h-[75px] w-[300px] hover:bg-red-600 hover:text-black rounded-xl" onClick={() => remove()}>
                REMOVE
            </button>
        </div>
    );
}