import React, { useState } from "react";
import ArtifactList from './ArtifactList'

export default function SearchBarArtifact() {

    const [inputText, setInputText] = useState("");

    let inputHandler = (e) => {
        setInputText(e.target.value);
    };

    return(
        <div className="searchArtifact">
            <input
                className="artifactSearchBar"
                type="text"
                placeholder="Search Artifact"
                onChange={inputHandler}
                value={inputText}
            />
            <ArtifactList input={inputText}/>
        </div>
    );
}
