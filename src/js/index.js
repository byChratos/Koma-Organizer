import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App';
import NavigationBar from "./NavigationBar";

import './index.scss';


const domNode = document.getElementById('root');
const root = ReactDOM.createRoot(domNode);

const navDom = document.getElementById('nav');
const nav = ReactDOM.createRoot(navDom);


root.render(<App />);
nav.render(<NavigationBar />);