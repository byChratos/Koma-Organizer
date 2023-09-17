import React, { useState } from "react";
import DrowDown from "./Modals/ModalLists/DropDown";

export default function DropdownMenu({ selectedServer, setSelectedServer }) {
    
    const[isOpen, setIsOpen] = useState(false);
    const[selection, setSelection] = useState(selectedServer);
    const elements = ["America", "Asia", "Europe", "SAR"];

    function handleClick(element) {
        setIsOpen(false);
        setSelectedServer(element);
        setSelection(element);
    }

    return(
        <div className="relative inline-block ml-auto mr-3">
            <div className={`bg-[#1c6569] text-white font-merri w-[150px] h-[50px] ${isOpen ? 'rounded-t-lg' : 'rounded-lg'} flex flex-row items-center pl-2`}>
                <p>{selection}</p>
                <button className="bg-[#1c6569] hover:bg-[#00ADB5] transition-colors ease-in-out rounded-lg ml-auto mr-2" onClick={() => setIsOpen(!isOpen)}>
                    <DrowDown
                        width="35" height="35"
                        isOpen={isOpen}
                        color="#ffffff"
                        strokeWidth="4"
                        lineProps={{ strokeLinecap: "round" }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    />
                </button>
            </div>
            {isOpen &&
                <ul className="absolute top-[100%] left-0 list-none p-0 m-0 w-[150px] rounded-b-lg overflow-hidden bg-[#1c6569] z-10">
                    <div className="bg-white opacity-70 w-[80%] h-[2px] ml-auto mr-auto my-[2px] rounded-full"></div>
                    {elements.map((element) => (
                        <li key={element}
                            onClick={() => handleClick(element)}
                            className="bg-[#1c6569] hover:bg-[#00ADB5] transition-colors ease-in-out p-[10px] cursor-pointer"
                        >
                            <p className="text-white font-merri">{element}</p>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}