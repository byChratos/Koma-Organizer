import React, { useState } from "react";
import CharacterList from './CharacterList'

export default function SearchBar() {

    const [inputText, setInputText] = useState("");

    let inputHandler = (e) => {
        setInputText(e.target.value);
    };

    return(
        <div className="search">
            <input
                className="charSearchBar"
                type="text"
                placeholder="Search Character"
                onChange={inputHandler}
                value={inputText}
            />
            <CharacterList input={inputText}/>
        </div>
    );
}
