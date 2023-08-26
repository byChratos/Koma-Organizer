import React, { useState } from 'react';

import Add from '../components/Buttons/Add'
import Day from "../components/Day";
import DayInformationModal from '../components/Modals/DayInformationModal';

/* //! Color Palette:

    Light-Blue: #3873AA
    Blue: #3943B7
    Dark-Gray: #333231
    Gray: #787878

*/

export default function Calendar() {

    const [modalOpen, setModalOpen] = useState(false);
    const setModal = (val) => {
        setModalOpen(val);
    }

    const [modalDay, setModalDay] = useState(null);
    const setDay = (day) => {
        setModalDay(day);
    }

    return(
        <div className='w-full h-full bg-[#333231] text-center select-none'>
            {/* Header */}
            <div className='w-full h-[15%] text-center p-2'>
                <h1 className="text-white font-merri text-4xl">Calendar</h1>
                <p className="text-white font-merri text-xl">ABC</p>
            </div>

            {/* Body */}
            <div className="w-full h-[85%] bg-[#333231] grid grid-rows-3 grid-cols-3">

                <Day dayName="Monday" className="row-start-1 col-start-1 justify-self-center self-center" handleButton={setModal} setDay={setDay} />

                <Day dayName="Tuesday" className="row-start-2 col-start-1 justify-self-center self-center" handleButton={setModal} setDay={setDay} />

                <Day dayName="Wednesday" className="row-start-3 col-start-1 justify-self-center self-center" handleButton={setModal} setDay={setDay} />

                <Day dayName="Thursday" className="row-start-2 col-start-2 justify-self-center self-center" handleButton={setModal} setDay={setDay} />

                <Day dayName="Friday" className="row-start-1 col-start-3 justify-self-center self-center" handleButton={setModal} setDay={setDay} />

                <Day dayName="Saturday" className="row-start-2 col-start-3 justify-self-center self-center" handleButton={setModal} setDay={setDay} />

                <Day dayName="Sunday" className="row-start-3 col-start-3 justify-self-center self-center" handleButton={setModal} setDay={setDay} />


            </div>
            
            {modalOpen ? <DayInformationModal modalOpen={setModal} setModalType={setDay} day={modalDay} /> : null}

        </div>
    )
}