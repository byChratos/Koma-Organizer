import React from "react";
import WeaponList from "./WeaponList";

export default function WeaponListModal({ weapons }) {

    return(
        <div className="flex flex-col items-center">
            {weapons.map((weapon, index) => (
                <WeaponList key={weapon["weaponName"]} className="rounded-md my-[8px]" weapon={weapon} />
            ))}
        </div>
    );
}