import React from "react";
import WeaponList from "./WeaponList";

export default function WeaponListModal({ className, weapons }) {

    return(
        <div>
            {weapons.map((weapon, index) => (
                <WeaponList key={weapon["weaponName"]} className="rounded-md my-[8px]" weapon={weapon} />
            ))}
        </div>
    );
}