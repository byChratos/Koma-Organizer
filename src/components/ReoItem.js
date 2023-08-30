import React from "react";
import { Reorder } from "framer-motion";

export default function ReoItem({ entry }) {
    return(
        <Reorder.Item value={entry}>
            {entry["name"]}
        </Reorder.Item>
    );
}