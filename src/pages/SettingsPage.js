import React, { useState } from "react";
import config from "../../config.json";

export default function SettingsPage() {

    //TODO need user config with settings
    const[selectedServer, setSelectedServer] = useState(config["server"]);

    const handleChange = (e) => {
        setSelectedServer(e.target.value);
    }

    return(
        <div className="w-full h-full bg-[#222831] flex flex-col items-center pt-3">
            <div className="bg-[#393E46] h-[100px] w-[40%] flex flex-row items-center rounded-lg">
                <h1 className="text-white font-merri text-xl ml-3">Server</h1>
                <select
                    className="ml-auto mr-3 bg-[#1c6569] hover:bg-[#00ADB5] selection:bg-slate-500 transition-color ease-in-out duration-100 p-3 rounded-xl text-white font-merri w-[150px]"
                    onChange={handleChange}
                    value={selectedServer}
                >
                    <option className="bg-[#1c6569] focus:bg-slate-500" value="none">None</option>
                    <option className="bg-[#1c6569] selection:bg-slate-500" value="Asia">Asia</option>
                    <option className="bg-[#1c6569] selection:bg-slate-500" value="America">America</option>
                    <option className="bg-[#1c6569] selection:bg-slate-500" value="Europe">Europe</option>
                </select>
            </div>

            <div className="bg-[#393E46] h-[100px] w-[40%] flex flex-row items-center rounded-lg mt-3">
                <h1 className="text-white font-merri text-xl ml-3">Update Koma</h1>
            </div>
        </div>
    )
}
{/* <p className="text-gray-300 font-merri text-sm ml-3">Select the Server you play on. Used to display the current day in the calendar</p> */}