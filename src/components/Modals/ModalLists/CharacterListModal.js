import React from "react";
import CharList from "./CharList";

export default function CharacterListModal({ characters, farmData, bossData }) {

    return(
        <div className="flex flex-col items-center">
            {characters.map((char, index) => (
                <CharList key={char["name"] + " " + index} char={char} farmData={farmData} bossData={bossData} />
            ))}
        </div>
    );
}