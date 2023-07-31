//Default imports
import React from "react";
import ReactDOM from "react-dom/client";

//Components
import NavigationBar from "../components/NavigationBar";

//Style
import '../style/index.css'

const rootDom = document.getElementById('root');
const root = ReactDOM.createRoot(rootDom);

root.render(<NavigationBar />);