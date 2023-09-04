import React from "react";
import ArtifactList from "./ArtifactList";

export default function ArtifactListModal({ artifacts }) {

    return(
        <div className="flex flex-col items-center">
            {artifacts.map((artifact, index) => (
                <ArtifactList key={artifact["artifactName"]} className="rounded-md my-[8px]" artifact={artifact}/>
            ))}
        </div>
    );
}