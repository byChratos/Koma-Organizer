import React from "react";
import GenshinImage from "../GenshinImage";

export default function WeaponSelected({ weapon, width, height, handleButtonClick }){

    return (

        <div className="selectedWeapon">
            <GenshinImage objectName={weapon} objectType="weapons" imageType="icon" width={width} height={height} />
            <button onClick={() => { handleButtonClick(null) } } className="bg-red-600 text-black relative">Remove Weapon</button>
        </div>
    );
}