import React, { useState } from "react";
import DropdownMenu from "../components/DropdownMenu";
import config from "../../config.json";

export default function SettingsPage() {

    const[selectedServer, setSelectedServer] = useState(config["server"]);

    function changeServer(server){
        setSelectedServer(server);
        config = {
            ...config,
            server: server,
        }
        window.api.saveConfig(config);
    }

    return(
        <div className="w-full h-full bg-[#222831] flex flex-col items-center">
            <div className="bg-[#393E46] h-[100px] w-[40%] flex flex-row items-center rounded-lg mt-3">
                <h1 className="text-white font-merri text-xl ml-3">Server</h1>
                <DropdownMenu selectedServer={selectedServer} setSelectedServer={changeServer}/>
            </div>

            <div className="bg-[#393E46] h-[100px] w-[40%] flex flex-row items-center rounded-lg mt-3">
                <h1 className="text-white font-merri text-xl ml-3">Update Koma</h1>
            </div>
        </div>
    )
}
{/* <p className="text-gray-300 font-merri text-sm ml-3">Select the Server you play on. Used to display the current day in the calendar</p> */}