import React, { useState } from "react";
import WeaponList from './WeaponList'

export default function SearchBarWeapon() {

    const [inputText, setInputText] = useState("");

    let inputHandler = (e) => {
        setInputText(e.target.value);
    };

    return(
        <div className="searchWeapon">
            <input
                className="weaponSearchBar"
                type="text"
                placeholder="Search Weapon"
                onChange={inputHandler}
                value={inputText}
            />
            <WeaponList input={inputText}/>
        </div>
    );
}