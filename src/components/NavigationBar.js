import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Home from "../pages/Home"
import Calendar from "../pages/Calendar"
import '../style/navigation.scss'
import Add from "../pages/AddPage"


export default function NavigationBar() {

    const [isExpanded, setIsExpanded] = useState(false);

    return(
        <>
            <Router>
                <nav className={`navbar${isExpanded ? ' active' : ''}`}>
                    <button className="menuIcon" onClick={() => setIsExpanded(!isExpanded)}>☰</button>
                    <ul className={`linkList${isExpanded ? ' active' : ''}`}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/calendar">Calendar</Link></li>
                    </ul>
                </nav>

                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/add" element={<Add />} />
                </Routes>

            </Router>
        </>
    );
}