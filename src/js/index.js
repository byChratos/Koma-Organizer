//Default imports
import React from "react";
import ReactDOM from "react-dom/client";

//Components
import ProjectRouter from "../components/ProjectRouter";

//Style
import '../style/index.css'

const rootDom = document.getElementById('root');
const root = ReactDOM.createRoot(rootDom);

root.render(<ProjectRouter />);