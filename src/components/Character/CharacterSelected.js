import React from "react";
import CharIcon from "./CharIcon";

export default function CharacterSelected({ character, width, height }){

    return (

        <div className="selectedCharacter">
            <CharIcon character={character} type="gacha-card" width={width} height={height}/>
            <button className="bg-red-600 text-black relative">Remove Character</button>
        </div>
    );
}