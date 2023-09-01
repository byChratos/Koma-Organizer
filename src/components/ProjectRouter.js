import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

import Home from "../pages/Home"
import Calendar from "../pages/Calendar"
import Add from "../pages/AddPage"
import Priority from '../pages/Priority';
import Layout from '../pages/Layout';
import SettingsPage from '../pages/SettingsPage';


export default function ProjectRouter() {

    return(
        <>
            <Router>
                <Layout>
                    <AnimatePresence mode="wait">
                        <Routes>
                            <Route index path="/" element={<Home />} />
                            <Route path="/calendar" element={<Calendar />} />
                            <Route path="/add" element={<Add />} />
                            <Route path="/priority" element={<Priority />} />
                            <Route path="/settings" element={<SettingsPage />} />
                        </Routes>
                    </AnimatePresence>
                </Layout>
            </Router>
        </>
    );
}