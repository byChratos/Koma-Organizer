import React from "react";
import { motion } from "framer-motion";

export default function ListToggle({ isOpen, width, height, strokeWidth, color, transition, lineProps, ...props}){
    
    const variant = isOpen ? "opened" : "closed";

    const unitHeight = 4;
    const unitWidth = (unitHeight * (width)) / (height);

    const left = {
        closed: {
            x1: (unitWidth/6)*2,
            y1: (unitHeight/5)*2,
            x2: unitWidth/2,
            y2: (unitHeight/5)*3,
        },
        opened: {
            x1: (unitWidth/5)*2,
            y1: (unitHeight/5)*2,
            x2: (unitWidth/5)*3,
            y2: (unitHeight/5)*3,
        }
    };

    const top = {
        opened: {
            x1: (unitWidth/6)*2,
            y1: (unitHeight/5)*2,
            x2: unitWidth/2,
            y2: (unitHeight/5)*3,
        },
        closed: {
            x1: (unitWidth/5)*3,
            y1: (unitHeight/6)*2,
            x2: (unitWidth/5)*2,
            y2: unitWidth/2,
        }
    };

    const bottom = {
        opened: {
            x1: unitWidth/2 + 0.05,
            y1: (unitHeight/5)*3,
            x2: (unitWidth/6)*4,
            y2: (unitHeight/5)*2
        },
        closed: {
            x1: (unitWidth/5)*2,
            y1: unitHeight/2 + 0.05,
            x2: (unitWidth/5)*3,
            y2: (unitHeight/6)*4
        }
    };

    const right = {
        closed: {
            x1: unitWidth/2 + 0.05,
            y1: (unitHeight/5)*3,
            x2: (unitWidth/6)*4,
            y2: (unitHeight/5)*2
        },
        opened: {
            x1: (unitWidth/5)*2,
            y1: (unitHeight/5)*3,
            x2: (unitWidth/5)*3,
            y2: (unitHeight/5)*2,
        }
    }

    lineProps = {
        stroke: color,
        strokeWidth: strokeWidth,
        vectorEffect: "non-scaling-stroke",
        initial: "closed",
        animate: variant,
        transition,
        ...lineProps
    };

    return(
        <motion.svg
            viewBox={`0 0 ${unitWidth} ${unitHeight}`}
            overflow="visible"
            preserveAspectRatio="none"
            width={width}
            height={height}
            {...props}
        >
            <motion.line
                className="drop-shadow-md"
                x1={(unitWidth/6)*2}
                x2={unitWidth/2}
                y1={(unitHeight/5)*2}
                y2={(unitHeight/5)*3}
                variants={top}
                {...lineProps}
            >
            </motion.line>

            <motion.line
                className="drop-shadow-md"
                x1={unitWidth/2 + 0.05}
                x2={(unitWidth/6)*4}
                y1={(unitHeight/5)*3}
                y2={(unitHeight/5)*2}
                variants={bottom}
                {...lineProps}
            >
            </motion.line>
        </motion.svg>
    );
}