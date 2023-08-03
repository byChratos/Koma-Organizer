import React, { useState } from "react";

export default function SearchBarWeapon({ handleInput }) {

    const [inputText, setInputText] = useState("");

    let inputHandler = (e) => {
        setInputText(e.target.value);
        handleInput(e.target.value);
    };

    return(
        <input
            className="bg-[#EBE4D6] placeholder-[#4D5568] w-[90%] h-[50px] mt-[1%] mx-[1%] rounded-[20px] text-[35px] pl-[20px]"
            type="text"
            placeholder="Search Weapon"
            onChange={inputHandler}
            value={inputText}
        />
    );
}