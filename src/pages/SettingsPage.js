import React, { useState } from "react";
import { motion } from "framer-motion";
import DropdownMenu from "../components/DropdownMenu";
import config from "../../config.json";
import PopUp from "../components/Modals/PopUp";

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

    const buttons = {
        initial: {
            scale: 0.9,
        },
        hover: {
            scale: 1,
            transition: {
                duration: 0.2,
                type: "spring",
            }
        }
    }

    const[selectedServer, setSelectedServer] = useState(config["server"]);
    const[updating, setUpdating] = useState(false);
    const[updateResult, setUpdateResult] = useState(null);
    
    const[updateMessage, setUpdateMessage] = useState(null);

    function changeServer(server){
        setSelectedServer(server);
        config = {
            ...config,
            server: server,
        }
        window.api.saveConfig(config);
    }

    async function update(){
        setUpdating(true);
        const update = await window.api.update();
        setUpdateResult(update);
        setUpdating(false);

        if(update == "noUpdates"){
            setUpdateMessage("There were no updates.");
        }else if(update == "updateEnd"){
            setUpdateMessage("Updates finished downloading.");
        }else if(update.startsWith('wait')){
            const arr = update.split(" ");
            setUpdateMessage("Please wait " + arr[1] +  " seconds before checking for updates again.");
        }
    }

    function closePopup(v){
        setUpdateResult(null);
        setUpdateMessage(null);
    }

    return(
        <motion.div className="w-full h-full bg-[#222831] flex flex-col items-center pb-[84px]" variants={variants} initial="initial" animate="animate">

            {(updating && !updateResult) && <PopUp message="Updating..." setModalOpen={closePopup} closeEnabled={false} />}

            {(!updating && updateResult) && <PopUp message={updateMessage} setModalOpen={closePopup} closeEnabled={true}/>}

            <div className="bg-[#393E46] h-[100px] w-[40%] flex flex-row items-center rounded-lg mt-3">
                <h1 className="text-white font-merri text-xl ml-3">Server</h1>
                <DropdownMenu selectedServer={selectedServer} setSelectedServer={changeServer}/>
            </div>

            <div className="bg-[#393E46] h-[100px] w-[40%] flex flex-row items-center rounded-lg mt-3">
                <h1 className="text-white font-merri text-xl ml-3">Update Koma</h1>
                <motion.button 
                    className="ml-auto mr-2 rounded-lg p-4 text-white font-merri bg-[#1c6569]" onClick={() => update()}
                    variants={buttons}
                    initial="initial"
                    whileHover="hover"
                >Check for updates</motion.button>
            </div>
        </motion.div>
    )
}
{/* <p className="text-gray-300 font-merri text-sm ml-3">Select the Server you play on. Used to display the current day in the calendar</p> */}