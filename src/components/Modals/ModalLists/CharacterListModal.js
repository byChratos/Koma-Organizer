import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import ListElement from "./ListElement";

export default function CharacterListModal({ className, characters }) {

    //TODO Shrink character list => no doubles if talent + boss

    const[expandState, setExpandState] = useState(false);

    return(
        <div>
            {characters.map((char, index) => (
                <ListElement key={char["name"] + " " + index} className="rounded-md my-[8px]" setOpen={setExpandState} isAlreadyOpen={expandState} char={char} />
            ))}
        </div>
    );
}