import React, { useState } from "react";

export default function SearchBar({ handleInput, type }) {

    const [inputText, setInputText] = useState("");

    let inputHandler = (e) => {
        setInputText(e.target.value);
        handleInput(e.target.value);
    };

    return(
        <input
            className="bg-lightBG dark:bg-darkBGTwo focus:bg-lightPrimary dark:focus:bg-white placeholder-gray-300 dark:placeholder-gray-300 selection:bg-lightSecondary dark:selection:bg-darkPrimary w-[550px] h-[50px] mt-3 ml-3 rounded-[20px] text-[35px] pl-[20px] text-lightFont dark:text-darkFont focus:text-lightFontTwo dark:focus:text-black font-merri drop-shadow-md"
            type="text"
            placeholder={"Search " + type.charAt(0).toUpperCase() + type.slice(1)}
            onChange={inputHandler}
            value={inputText}
            spellCheck="false"
        />
    );
}
