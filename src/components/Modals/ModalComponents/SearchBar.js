import React, { useState } from "react";

export default function SearchBar({ handleInput, type }) {

    const [inputText, setInputText] = useState("");

    let inputHandler = (e) => {
        setInputText(e.target.value);
        handleInput(e.target.value);
    };

    return(
        <input
            className="bg-[#323b47] focus:bg-white placeholder-gray-300 selection:bg-[#00ADB5] w-[60%] h-[50px] mt-[1%] mx-[1%] rounded-[20px] text-[35px] pl-[20px] text-white focus:text-black font-merri drop-shadow-md"
            type="text"
            placeholder={"Search " + type.charAt(0).toUpperCase() + type.slice(1)}
            onChange={inputHandler}
            value={inputText}
            spellCheck="false"
        />
    );
}
