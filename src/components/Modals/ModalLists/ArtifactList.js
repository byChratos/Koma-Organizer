import React from "react";

export default function ArtifactList({ artifact }) {

    return(
        <div className="h-auto w-[95%] bg-[#1c6569] my-[6px] rounded-xl flex flex-col overflow-hidden">
            <div className={`w-full h-[50px] flex flex-row items-center transition-colors ease-in-out bg-[#1c6569]`}>
                <img src={artifact["artifactUrl"]} width="50" height="50"/>
                <h1 className={`font-merri text-white text-md ml-2 p-2 selection:bg-[#393E46] hover:bg-[#00ADB5] rounded-xl select-text`}>{artifact["artifactName"]}</h1>
            </div>
        </div>
    );
}