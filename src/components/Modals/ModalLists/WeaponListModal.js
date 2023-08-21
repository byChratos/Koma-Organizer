import React from "react";
import { twMerge } from "tailwind-merge";

export default function WeaponListModal({ className, weapons }) {
    return(
        <div>
            {weapons.map((weapon, index) => (
                <p key={weapon + " " + index} className="text-black">{weapon["name"]}</p>
            ))}
        </div>
    );
}