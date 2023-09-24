import React from "react";

export default function ArtifactList({ artifact }) {

    return(
        <div className="h-auto w-[95%] bg-lightSecondary dark:bg-darkSecondary my-[6px] rounded-xl flex flex-col overflow-hidden">
            <div className={`w-full h-[50px] flex flex-row items-center transition-colors ease-in-out bg-lightSecondary dark:bg-darkSecondary`}>
                <img src={artifact["artifactUrl"]} width="50" height="50"/>
                <h1 className={`font-merri text-lightFontTwo dark:text-darkFont text-md ml-2 p-2 selection:text-lightFont dark:selection:text-darkFont selection:bg-lightBGTwo dark:selection:bg-darkBGTwo hover:bg-lightPrimary dark:hover:bg-darkPrimary rounded-xl select-text`}>{artifact["artifactName"]}</h1>
            </div>
        </div>
    );
}