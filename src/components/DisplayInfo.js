import React from "react";

export default function DisplayInfo({name, add, remove}) {

    return(
        <div className="minW:w-[300px] mdW:w-[400px] h-fit bg-lightPrimary dark:bg-darkPrimary flex flex-col rounded-xl p-2 items-center justify-center minW:mt-[5px] mdW:mt-[10px] bg-opacity-70">
            
            <h1 className="font-merri text-lightFontTwo dark:text-darkFont text-lg select-text selection:bg-lightPrimary dark:selection:bg-darkPrimary hover:bg-lightSecondary dark:hover:bg-darkSecondary p-2 rounded-xl">{name}</h1>
            
            <button
                className="text-white font-merri text-lg minW:h-[50px] minW:w-[200px] mdW:h-[75px] mdW:w-[300px] hover:bg-green-600 rounded-xl"
                onClick={() => add()}
            >
                CONFIRM
            </button>
            <button
                className="text-white font-merri text-lg minW:h-[50px] minW:w-[200px] mdW:h-[75px] mdW:w-[300px] hover:bg-red-600 hover:text-black rounded-xl"
                onClick={() => remove()}
            >
                CANCEL
            </button>
        </div>
    );
}