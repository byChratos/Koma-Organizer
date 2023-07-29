//Default imports
import React from "react";
import ReactDOM from "react-dom/client";

//Components
import NavigationBar from "./NavigationBar";

const rootDom = document.getElementById('root');
const root = ReactDOM.createRoot(rootDom);

root.render(<NavigationBar />);