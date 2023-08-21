import React, { useState } from 'react';

import Add from '../components/Buttons/Add'
import GenshinImage from '../components/GenshinImage';
import Day from "../components/Day";
import DayInformationModal from '../components/Modals/DayInformationModal';


export default function Calendar() {

    const [modalOpen, setModalOpen] = useState(false);
    const setModal = (val) => {
        setModalOpen(val);
    }

    const [modalDay, setModalDay] = useState(null);
    const setDay = (day) => {
        setModalDay(day);
    }

    const dayStyle = "relative bg-orange-500 inline-block mt-3 h-24 w-20";

    return(
        <div className='w-full h-full bg-gray-500 px-[5%] py-[1%] text-center'>
            <h1 className='text-white'>Calendar</h1>
            <p className='text-white'>Hier kommt der Kalender</p>

            <div className="w-full h-[80%] bg-gray-400 grid grid-rows-3 grid-cols-3">

                <Day dayName="Monday" className="row-start-1 col-start-1 justify-self-center self-center" handleButton={setModal} setDay={setDay} />

                <Day dayName="Tuesday" className="row-start-2 col-start-1 justify-self-center self-center" handleButton={setModal} setDay={setDay} />

                <Day dayName="Wednesday" className="row-start-3 col-start-1 justify-self-center self-center" handleButton={setModal} setDay={setDay} />

                <Day dayName="Thursday" className="row-start-2 col-start-2 justify-self-center self-center" handleButton={setModal} setDay={setDay} />

                <Day dayName="Friday" className="row-start-1 col-start-3 justify-self-center self-center" handleButton={setModal} setDay={setDay} />

                <Day dayName="Saturday" className="row-start-2 col-start-3 justify-self-center self-center" handleButton={setModal} setDay={setDay} />

                <Day dayName="Sunday" className="row-start-3 col-start-3 justify-self-center self-center" handleButton={setModal} setDay={setDay} />


            </div>
            <Add />

            {modalOpen ? <DayInformationModal modalOpen={setModal} setModalType={setDay} day={modalDay} /> : null}

        </div>
    )
}