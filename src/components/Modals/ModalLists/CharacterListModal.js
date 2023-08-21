import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function CharacterListModal({ className, characters }) {

    const[expandState, setExpandState] = useState(false);

    return(
        <div>
            {characters.map((char, index) => (
                <button className="w-[95%] h-[30px] bg-blue-500 rounded-md my-[5px]" key={char["name"] + " " + index} onClick={() => setExpandState(!expandState)}>
                    <div>
                        <p className="text-black">{char["name"]}</p>
                    </div>
                </button>
            ))}
        </div>
    );
}