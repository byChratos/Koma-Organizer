import React from 'react';

import CharIcon from '../components/Character/CharIcon';
import Add from '../components/Add'

export default function Calendar() {

    // TODO Load needed characters from file

    const dayStyle = "relative bg-orange-500 inline-block mt-3 h-24 w-20";


    return(
        <div className='w-full h-full bg-gray-500'>
            <h1 className='text-white'>Calendar</h1>
            <p className='text-white'>Hier kommt der Kalender</p>

            <div className="days">

                <div className={ dayStyle } id="monday">
                    <p>Monday</p>
                    <div id="toFarmMonday"><CharIcon character="ayaka" type="icon" width="30" height="30"/></div>
                </div>

                <div className={ dayStyle } id="tuesday">
                    <p>Tuesday</p>
                </div>

                <div className={ dayStyle } id="wednesday">
                    <p>Wednesday</p>
                </div>

                <div className={ dayStyle } id="thursday">
                    <p>Thursday</p>
                </div>

                <div className={ dayStyle } id="friday">
                    <p>Friday</p>
                </div>

                <div className={ dayStyle } id="saturday">
                    <p>Saturday</p>
                </div>

                <div className={ dayStyle } id="sunday">
                    <p>Sunday</p>
                </div>


            </div>
            <div className='Add'><Add /></div>

        </div>
    )
}