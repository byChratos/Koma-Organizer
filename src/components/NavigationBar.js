import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

import Home from "../pages/Home"
import Calendar from "../pages/Calendar"
import Add from "../pages/AddPage"
import Priority from '../pages/Priority';
import Layout from '../pages/Layout';


export default function NavigationBar() {

    return(
        <>
            <Router>
                <Layout>
                    <AnimatePresence mode="wait">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/calendar" element={<Calendar />} />
                            <Route path="/add" element={<Add />} />
                            <Route path="/priority" element={<Priority />} />
                        </Routes>
                    </AnimatePresence>
                </Layout>
            </Router>
        </>
    );
}