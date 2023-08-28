import React from "react";

import TopBar from "../components/TopBar";

export default function Layout({ children }) {
    return(
        <div className="select-none">
            <TopBar />
            {children}
        </div>
    );
}