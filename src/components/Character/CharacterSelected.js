import React from "react";
import GenshinImage from "../GenshinImage";

export default function CharacterSelected({ character, width, height, handleButtonClick }){

    return (

        <div className="selectedCharacter">
            <GenshinImage objectName={character} objectType="characters" imageType="gacha-card" width={width} height={height} />
            <button onClick={() => { handleButtonClick(null) } } className="bg-red-600 text-black relative">Remove Character</button>
        </div>
    );
}