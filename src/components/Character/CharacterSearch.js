import React, { useState } from "react";
import CharacterList from './CharacterList'

export default function SearchBarCharacter({ onClickButton }) {

    const [inputText, setInputText] = useState("");

    let inputHandler = (e) => {
        setInputText(e.target.value);
    };

    return(
        <div className="searchChar">
            <input
                className="charSearchBar"
                type="text"
                placeholder="Search Character"
                onChange={inputHandler}
                value={inputText}
            />

            <CharacterList input={inputText} onButtonClick={ onClickButton }/>
        </div>
    );
}
