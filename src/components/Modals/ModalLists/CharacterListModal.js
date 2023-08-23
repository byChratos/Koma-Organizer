import React from "react";
import CharList from "./CharList";

export default function CharacterListModal({ className, characters }) {

    return(
        <div>
            {characters.map((char, index) => (
                <CharList key={char["name"] + " " + index} className="rounded-md my-[8px]" char={char} />
            ))}
        </div>
    );
}