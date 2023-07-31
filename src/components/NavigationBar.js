import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Home from "../pages/Home"
import Calendar from "../pages/Calendar"
import Add from "../pages/AddPage"


export default function NavigationBar() {

    const [isExpanded, setIsExpanded] = useState(false);

    return(
        <>
            <Router>
                <nav className={`${isExpanded ? 'block bg-blue-400 float-left w-1/5 h-full' : 'block float-left bg-blue-400 w-5 h-full'}`}>
                    <button className="text-xl cursor-pointer bg-none border-none text-black" onClick={() => setIsExpanded(!isExpanded)}>☰</button>
                    <ul className={`${isExpanded ? 'block' : 'hidden'}`}>
                        <li className='text-center list-none list-inside mt-1 border-solid border-black border-2'><Link to="/">Home</Link></li>
                        <li className='text-center list-none list-inside mt-1 border-solid border-black border-2'><Link to="/calendar">Calendar</Link></li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/add" element={<Add />} />
                </Routes>

            </Router>
        </>
    );
}