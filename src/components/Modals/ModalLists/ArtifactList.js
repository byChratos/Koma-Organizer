import React from "react";
import { twMerge } from "tailwind-merge";

export default function ArtifactList({ className, artifact }) {

    return(
        <div className={twMerge("w-[95%] h-[50px] flex flex-col bg-blue-400 overflow-hidden", className)}>
            {/* Header */}
            <div className="w-full h-[50px] flex-1">
                <img className="object-cover inline-block float-left" src={artifact["artifactUrl"]} width="50" height="50"/>
                <h1 className="text-black flaot-left"> {artifact["artifactName"]} </h1>
            </div>
        </div>
    );
}