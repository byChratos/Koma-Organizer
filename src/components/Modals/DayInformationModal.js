import React, { useState } from 'react';
import { motion } from 'framer-motion';

import Backdrop from './Backdrop';

import { getDayNumber } from '../../functions/nonModuleFunctions';
import { getFarmable } from '../../functions/enkaFunctions';

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

export default function DayInformationModal({ modalOpen, setModalType, day }) {
    
    const dayNumber = getDayNumber(day);

    let farmable = getFarmable(dayNumber);
    let top = farmable[0];

    function close(){
        setModalType(null);
        modalOpen(false);
    }

    return(
        <Backdrop handleClick={ modalOpen } setModalType={ setModalType }>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-800 w-[80%] h-[75%] rounded-[20px] overflow-hidden"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
            {/* Heading Div */}
            <div className='bg-[#333333] rounded-t-[20px] w-full h-[15%] inline-block'>
                <h1 className="text-white float-left mt-[1%] mx-[1%]"> {day} </h1>
                <button className="bg-red-500 hover:bg-[#ff4e4e] h-[50px] w-[6%] rounded-[20px] mt-[1%] mx-[1%] float-right" onClick={() => {close()}}>Close</button>
            </div>


            {/* Body Div */}
            <div className='w-full h-[85%] overflow-y-auto overflow-x-hidden grid grid-cols-3 grid-rows-3 gap-3'>
                {/* Top Priority */}
                <div className="bg-gray-400 w-[98%] h-[98%] ml-[1%] row-start-1 col-start-1 col-span-full rounded-md">
                    <p className='text-white'>{ top["name"] }</p>
                    <p className='text-white'>{ top["id"] }</p>
                    <p className='text-white'>{ top["type"] }</p>
                    <p className='text-white'>{ top["boss"] }</p>
                </div>

                {/* Chars */}
                <div className="bg-gray-400 w-[98%] h-[98%] ml-[1%] row-start-2 col-start-1 row-span-2 rounded-md">

                </div>
                {/* Weapons */}
                <div className="bg-gray-400 w-full h-full row-start-2 col-start-2 row-span-2">

                </div>
                {/* Artifacts */}
                <div className="bg-gray-400 w-full h-full row-start-2 col-start-3 row-span-2">

                </div>
            </div>
            

            </motion.div>
        </Backdrop>
    );
}