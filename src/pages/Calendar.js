import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Day from "../components/Day";
import DayInformationModal from '../components/Modals/DayInformationModal';
import moment from 'moment-timezone';
import { log } from '../functions/nonModuleFunctions';

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
        loadConfig();
    }, []);

    async function loadConfig(){
        let config = await window.api.storeGet({ file: "user", item: "config" });
        let sv = config["server"];
        sortDays(sv);
    }

    const[modalOpen, setModalOpen] = useState(false);
    const[modalDay, setModalDay] = useState(null);
    const[days, setDays] = useState(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);

    

    function sortDays(sv){
        const dayList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let sortedDays = [];

        //1. Get current day of server
        let timezone;
        if(sv == "America"){
            timezone = 'America/New_York';
        }else if(sv == "Asia"){
            timezone = 'Asia/Singapore';
        }else if(sv == "Europe"){
            timezone = 'Europe/London';
        }else{
            timezone = 'Asia/Singapore';
        }

        const currentDate = moment().tz(timezone);
        let day = currentDate.isoWeekday();
        const hours = currentDate.hours();

        //2. Get day to the sortedDays first entry and all other normally
        if(hours < 4){
            if(day > 1){
                day = day - 1;
            }else{
                day = 7;
            }
        }

        sortedDays.push(dayList[day-1]);
        for(const entry of dayList){
            if(entry == sortedDays[0]){
                continue;
            }else{
                sortedDays.push(entry);
            }
        }
        setDays(sortedDays);
    }

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

            <div className="w-full h-full pb-[84px] flex flex-row">
                <div className="h-full w-[33%] flex flex-col">
                    <div className="w-full h-full flex items-center justify-center">
                        <Day primary={false} dayName={days[1]} handleButton={setModalOpen} setDay={setModalDay} />
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                        <Day primary={false} dayName={days[2]} handleButton={setModalOpen} setDay={setModalDay} />
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                        <Day primary={false} dayName={days[3]} handleButton={setModalOpen} setDay={setModalDay} />
                    </div>
                </div>
                <div className="h-full w-[34%] flex items-center justify-center">
                    <Day primary={true} dayName={days[0]} handleButton={setModalOpen} setDay={setModalDay} />
                </div>
                <div className="h-full w-[33%] flex flex-col">
                    <div className="w-full h-full flex items-center justify-center">
                        <Day primary={false} dayName={days[4]} handleButton={setModalOpen} setDay={setModalDay} />
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                        <Day primary={false} dayName={days[5]} handleButton={setModalOpen} setDay={setModalDay} />
                    </div>
                    <div className="w-full h-full flex items-center justify-center">
                        <Day primary={false} dayName={days[6]} handleButton={setModalOpen} setDay={setModalDay} />
                    </div>
                </div>
            </div>

        </motion.div>
    )
}