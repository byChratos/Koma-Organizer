import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function ListElement({ className, setOpen, isAlreadyOpen, char }) {

    const[isOpen, setIsOpen] = useState(false);

    function handleClick() {
        if(!isAlreadyOpen){
            setIsOpen(true);
            setOpen(true);
        }else{
            setIsOpen(false);
            setOpen(false);
        }
    }

    return(
        <button className={(isOpen) ? twMerge("bg-blue-400 w-[95%] h-[200px]", className) : twMerge("bg-blue-500 w-[95%] h-[50px]", className)} onClick={() => handleClick()}>
            <div className="w-full h-full flex overflow-hidden">
                <div className="w-full h-[50px]">
                    <img className="object-cover inline-block float-left" src={char["entityUrl"]} width="50" height="50"/>
                    <h1 className="text-black flaot-left"> {char["name"]} </h1>
                </div>
                <div>

                </div>
            </div>
        </button>
    );
}