import React, { useState } from "react";
import { motion } from "framer-motion";
import DropdownMenu from "../components/DropdownMenu";
import config from "../../config.json";

export default function SettingsPage() {

    const variants = {
        initial: {
            opacity: 0,
            x: "-100%",
        },
        animate: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
            },
        },
    }

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
        <motion.div className="w-full h-full bg-[#222831] flex flex-col items-center" variants={variants} initial="initial" animate="animate">
            <div className="bg-[#393E46] h-[100px] w-[40%] flex flex-row items-center rounded-lg mt-3">
                <h1 className="text-white font-merri text-xl ml-3">Server</h1>
                <DropdownMenu selectedServer={selectedServer} setSelectedServer={changeServer}/>
            </div>

            <div className="bg-[#393E46] h-[100px] w-[40%] flex flex-row items-center rounded-lg mt-3">
                <h1 className="text-white font-merri text-xl ml-3">Update Koma</h1>
            </div>
        </motion.div>
    )
}
{/* <p className="text-gray-300 font-merri text-sm ml-3">Select the Server you play on. Used to display the current day in the calendar</p> */}