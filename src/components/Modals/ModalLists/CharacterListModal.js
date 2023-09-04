import React from "react";
import CharList from "./CharList";

export default function CharacterListModal({ characters }) {

    return(
        <div className="flex flex-col items-center">
            {characters.map((char, index) => (
                <CharList key={char["name"] + " " + index} char={char} />
            ))}
        </div>
    );
}