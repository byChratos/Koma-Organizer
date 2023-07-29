import React from 'react';
import './page.scss'

import CharIcon from '../components/Character/CharIcon';
import Add from '../components/Add'

export default function Calendar() {

    // TODO Load needed characters from file

    return(
        <div id="content">
            <h1>Calendar</h1>
            <p>Hier kommt der Kalender</p>

            <div className="days">

                <div className="hexagon" id="monday">
                    <p>Monday</p>
                    <div id="toFarmMonday"><CharIcon character="ayaka" type="icon" width="30" height="30"/></div>
                </div>

                <div className="hexagon" id="tuesday">
                    <p>Tuesday</p>
                </div>

                <div className="hexagon" id="wednesday">
                    <p>Wednesday</p>
                </div>

                <div className="hexagon" id="thursday">
                    <p>Thursday</p>
                </div>

                <div className="hexagon" id="friday">
                    <p>Friday</p>
                </div>

                <div className="hexagon" id="saturday">
                    <p>Saturday</p>
                </div>

                <div className="hexagon" id="sunday">
                    <p>Sunday</p>
                </div>


            </div>
            <div className='Add'><Add /></div>

        </div>
    )
}