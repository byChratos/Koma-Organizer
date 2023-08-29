import React, { useState } from 'react';
import { motion } from 'framer-motion';

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

    const[modalOpen, setModalOpen] = useState(false);
    const setModal = (val) => {
        setModalOpen(val);
    }

    const[modalDay, setModalDay] = useState(null);
    const setDay = (day) => {
        setModalDay(day);
    }

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return(
        <motion.div
            className='flex flex-col h-screen select-none'
            variants={variants}
            initial="initial"
            animate="animate"
        >
            {/* Content */}
            <div className="w-full h-full flex flex-col justify-center items-center bg-[#333231]">

                <Day dayName="Monday" className="justify-self-center self-center top-0 left-0" handleButton={setModal} setDay={setDay} />

                <Day dayName="Tuesday" className="justify-self-center self-center" handleButton={setModal} setDay={setDay} />

                <Day dayName="Wednesday" className="justify-self-center self-center" handleButton={setModal} setDay={setDay} />

                <Day dayName="Thursday" className="justify-self-center self-center" handleButton={setModal} setDay={setDay} />

                <Day dayName="Friday" className="justify-self-center self-center" handleButton={setModal} setDay={setDay} />

                <Day dayName="Saturday" className="justify-self-center self-center" handleButton={setModal} setDay={setDay} />

                <Day dayName="Sunday" className="justify-self-center self-center" handleButton={setModal} setDay={setDay} />


            </div>
            
            {modalOpen ? <DayInformationModal modalOpen={setModal} setModalType={setDay} day={modalDay} /> : null}

        </motion.div>
    )
}