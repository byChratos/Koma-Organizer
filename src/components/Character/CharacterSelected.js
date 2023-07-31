import React from "react";
import CharIcon from "./CharIcon";

export default function CharacterSelected({ character, width, height, handleButtonClick }){

    return (

        <div className="selectedCharacter">
            <CharIcon character={character} type="gacha-card" width={width} height={height}/>
            <button onClick={() => { handleButtonClick(null) } } className="bg-red-600 text-black relative">Remove Character</button>
        </div>
    );
}