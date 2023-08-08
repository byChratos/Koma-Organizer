import React from "react";
import { twMerge } from "tailwind-merge";

export default function Day({ dayName, className, handleButton, setDay }) {

    function openModal() {
        handleButton(true);
        setDay(dayName);
    }

    return(
        <button className={twMerge("cursor-pointer h-24 w-20 inline-block relative", className)} onClick={() => { openModal() }}>
            <div className={twMerge("relative bg-orange-500 inline-block h-24 w-20 ", className)}>
                <p className="text-black text-center"> { dayName } </p>
            </div>
        </button>
    );
}