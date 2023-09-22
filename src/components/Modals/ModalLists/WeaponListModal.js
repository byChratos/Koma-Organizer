import React from "react";
import WeaponList from "./WeaponList";

export default function WeaponListModal({ weapons, weaponData, data }) {

    return(
        <div className="flex flex-col items-center">
            {weapons.map((weapon, index) => (
                <WeaponList key={weapon["weaponName"]} weapon={weapon} data={data} weaponData={weaponData}/>
            ))}
        </div>
    );
}