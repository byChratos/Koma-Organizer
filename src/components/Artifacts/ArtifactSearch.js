import React, { useState } from "react";
import ArtifactList from './ArtifactList'

export default function SearchBarArtifact() {

    const [inputText, setInputText] = useState("");

    let inputHandler = (e) => {
        setInputText(e.target.value);
    };

    return(
        <div className="w-10/9 m-3">
            <input
                className="bg-[#EBE4D6] w-full h-7 rounded-md placeholder-[#4D5568]"
                type="text"
                placeholder="Search Artifact"
                onChange={inputHandler}
                value={inputText}
            />
            <ArtifactList input={inputText}/>
        </div>
    );
}
