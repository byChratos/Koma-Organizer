import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import config from "../../config.json";

import Day from "../components/Day";
import DayInformationModal from '../components/Modals/DayInformationModal';


/* //! Color Palette:

    Light-Blue: #3873AA
    Blue: #3943B7
    Dark-Gray: #333231
    Gray: #787878

*/

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

export default function Calendar() {

    useEffect(() => {
        load();
    }, []);

    async function load(){
        let server = await window.api.loadConfig();
        if(server != "empty"){
            setServer(server["server"]);
        }
        sortDays();
    }

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let sortedDays = [];

    function sortDays(){
        //TODO
    //1. Get current day of server
        let date = new Date();
        let day = date.getDay();
        let hours = date.getHours();

        
    }

    const[modalOpen, setModalOpen] = useState(false);
    const[modalDay, setModalDay] = useState(null);
    const[server, setServer] = useState(config["server"]);

    return(
        <motion.div
            className='flex flex-col h-screen select-none'
            variants={variants}
            initial="initial"
            animate="animate"
        >
            <AnimatePresence>
                {modalOpen ? <DayInformationModal modalOpen={setModalOpen} setModalType={setModalDay} day={modalDay} /> : null}
            </AnimatePresence>

            <button onClick={() => console.log(server)}>TEST</button>

            <div className="w-full h-full pb-[84px] flex flex-row">
                <div className="h-full w-[33%] flex flex-col">
                    <div className="w-full h-full flex items-center justify-center">
                        <Day primary={false} dayName={sortedDays[1]} handleButton={setModalOpen} setDay={setModalDay} />
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                        <Day primary={false} dayName={sortedDays[2]} handleButton={setModalOpen} setDay={setModalDay} />
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                        <Day primary={false} dayName={sortedDays[3]} handleButton={setModalOpen} setDay={setModalDay} />
                    </div>
                </div>
                <div className="h-full w-[34%] flex items-center justify-center">
                    <Day primary={true} dayName={sortedDays[0]} handleButton={setModalOpen} setDay={setModalDay} />
                </div>
                <div className="h-full w-[33%] flex flex-col">
                    <div className="w-full h-full flex items-center justify-center">
                        <Day primary={false} dayName={sortedDays[4]} handleButton={setModalOpen} setDay={setModalDay} />
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                        <Day primary={false} dayName={sortedDays[5]} handleButton={setModalOpen} setDay={setModalDay} />
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                        <Day primary={false} dayName={sortedDays[6]} handleButton={setModalOpen} setDay={setModalDay} />
                    </div>
                </div>
            </div>

        </motion.div>
    )
}