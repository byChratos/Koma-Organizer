import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import DropdownMenu from "../components/DropdownMenu";
import PopUp from "../components/Modals/PopUp";
import { PageContext } from "../components/PageContext";

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

    useEffect(() => {
        loadConfig();
        getVersion();
    }, []);

    async function loadConfig(){
        let cnfg = await window.api.storeGet({ file: "user", item: "config" });
        setConfig(cnfg);
        setSelectedServer(cnfg["server"]);

        let str = cnfg["theme"];
        str = str[0].charAt(0).toUpperCase() + str.slice(1);
        setCurrentTheme(str);
    }

    async function getVersion(){
        const v = await window.api.getVersion();
        setVersion(v);
    }

    const[selectedServer, setSelectedServer] = useState("None");
    const[theme, setCurrentTheme] = useState("Dark");
    const[config, setConfig] = useState(null);
    const[updating, setUpdating] = useState(false);
    const[updateResult, setUpdateResult] = useState(null);
    
    const[updateMessage, setUpdateMessage] = useState(null);

    const[version, setVersion] = useState(null);

    const {
        setTheme
    } = useContext(PageContext);

    const servers = ["America", "Asia", "Europe", "SAR"];
    const themes = ["Light", "Dark"];



    function changeServer(server){
        setSelectedServer(server);
        let newConfig = {
            ...config,
            server: server,
        }
        window.api.storeSet({ file: "user", item: "config", value: newConfig });
        setConfig(newConfig);
    }

    function changeTheme(th){
        setCurrentTheme(th);
        let newConfig = {
            ...config,
            theme: th.toLowerCase(),
        }
        window.api.storeSet({ file: "user", item: "config", value: newConfig });
        setConfig(newConfig);
        setTheme(th.toLowerCase());
    }

    async function updateKoma(){
        
        setUpdating(true);
        const update = await window.api.updateKoma();
        setUpdating(false);

        if(update.startsWith('wait')){
            setUpdateResult(update);
            const arr = update.split(" ");
            setUpdateMessage("Please wait " + arr[1] + " seconds before checking for Koma updates again.");
        }else{
            setUpdateResult(null);
        }
    }

    function closePopup(){
        setUpdateResult(null);
        setUpdateMessage(null);
    }

    return(
        <motion.div className="w-full h-full bg-lightBG dark:bg-darkBG flex flex-col items-center pb-[84px]" variants={variants} initial="initial" animate="animate">

            {(updating && !updateResult) && <PopUp message="Updating..." setModalOpen={closePopup} closeEnabled={false} />}

            {(!updating && updateResult) && <PopUp message={updateMessage} setModalOpen={closePopup} closeEnabled={true}/>}

            <div className="bg-lightBGTwo dark:bg-darkBGTwo h-[100px] w-[40%] flex flex-row items-center rounded-lg mt-3">
                <h1 className="text-lightFont dark:text-darkFont font-merri text-xl ml-3">Server</h1>
                <DropdownMenu selected={selectedServer} setSelected={changeServer} elements={servers} z="z-20"/>
            </div>

            <div className="bg-lightBGTwo dark:bg-darkBGTwo h-[100px] w-[40%] flex flex-row items-center rounded-lg mt-3">
                <h1 className="text-lightFont dark:text-darkFont font-merri text-xl ml-3">Theme</h1>
                <DropdownMenu selected={theme} setSelected={changeTheme} elements={themes} z="z-10"/>
            </div>

            <div className="bg-lightBGTwo dark:bg-darkBGTwo h-[100px] w-[40%] flex flex-row items-center rounded-lg mt-3">
                <div className="h-full w-fit flex flex-col justify-center">
                    <h1 className="text-lightFont dark:text-darkFont font-merri text-xl ml-3">Update Koma</h1>
                    <p className="text-lightFont dark:text-darkFont font-merri text-sm ml-6">Currently: V{version}</p>
                </div>
                <motion.button 
                    className="ml-auto mr-2 rounded-lg p-4 text-lightFontTwo dark:text-darkFont font-merri bg-lightSecondary dark:bg-darkSecondary" onClick={() => updateKoma()}
                    variants={buttons}
                    initial="initial"
                    whileHover="hover"
                >Check for updates</motion.button>
            </div>
        </motion.div>
    )
}
{/* <p className="text-gray-300 font-merri text-sm ml-3">Select the Server you play on. Used to display the current day in the calendar</p> */}