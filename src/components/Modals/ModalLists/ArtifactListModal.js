import React from "react";
import { twMerge } from "tailwind-merge";

export default function ArtifactListModal({ className, artifacts }) {
    return(
        <div>
            {artifacts.map((artifact, index) => (
                <p key={artifact + " " + index} className="text-black">{artifact["name"]}</p>
            ))}
        </div>
    );
}