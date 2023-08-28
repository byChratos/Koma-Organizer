import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Day from "../components/Day";
import DayInformationModal from '../components/Modals/DayInformationModal';
import NavToggle from '../components/Navigation/NavToggle';
import Navbar from '../components/Navigation/Navbar';

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
      exit: {
        opacity: 0,
        x: "100%",
        transition: {
          duration: 0.5,
        },
      },
}

export default function Calendar() {

    const navigate = useNavigate();
    const[isOpen, toggleIsOpen] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const setModal = (val) => {
        setModalOpen(val);
    }

    const [modalDay, setModalDay] = useState(null);
    const setDay = (day) => {
        setModalDay(day);
    }

    return(
        <motion.div
            className='flex flex-col h-screen select-none'
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {/* Header */}
            <div className='w-full flex-none text-center p-2 bg-[#42413F] drop-shadow-md'>
                <h1 className="text-white font-merri text-4xl">Calendar</h1>
                <p className="text-white font-merri text-xl">Organize or smth</p>

                <NavToggle toggle={toggleIsOpen} isOpen={isOpen}/>
                <Navbar isOpen={isOpen} />
            </div>


            {/* Body */}
            <div className="w-full flex-grow bg-[#333231] grid grid-rows-3 grid-cols-3">

                <Day dayName="Monday" className="row-start-1 col-start-1 justify-self-center self-center" handleButton={setModal} setDay={setDay} />

                <Day dayName="Tuesday" className="row-start-2 col-start-1 justify-self-center self-center" handleButton={setModal} setDay={setDay} />

                <Day dayName="Wednesday" className="row-start-3 col-start-1 justify-self-center self-center" handleButton={setModal} setDay={setDay} />

                <Day dayName="Thursday" className="row-start-2 col-start-2 justify-self-center self-center" handleButton={setModal} setDay={setDay} />

                <Day dayName="Friday" className="row-start-1 col-start-3 justify-self-center self-center" handleButton={setModal} setDay={setDay} />

                <Day dayName="Saturday" className="row-start-2 col-start-3 justify-self-center self-center" handleButton={setModal} setDay={setDay} />

                <Day dayName="Sunday" className="row-start-3 col-start-3 justify-self-center self-center" handleButton={setModal} setDay={setDay} />


            </div>
            
            {modalOpen ? <DayInformationModal modalOpen={setModal} setModalType={setDay} day={modalDay} /> : null}

        </motion.div>
    )
}