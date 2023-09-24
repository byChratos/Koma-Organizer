import React, { useState, useEffect } from "react";
import DrowDown from "./Modals/ModalLists/DropDown";

export default function DropdownMenu({ selected, setSelected, elements, z }) {
    
    useEffect(() => {
        setSelection(selected);
    }, [selected]);

    const[isOpen, setIsOpen] = useState(false);
    const[selection, setSelection] = useState(selected);

    function handleClick(element) {
        setIsOpen(false);
        setSelected(element);
        setSelection(element);
    }

    return(
        <div className="relative inline-block ml-auto mr-3">
            <div className={`bg-lightSecondary dark:bg-darkSecondary text-lightFontTwo dark:text-darkFont font-merri w-[150px] h-[50px] ${isOpen ? 'rounded-t-lg' : 'rounded-lg'} flex flex-row items-center pl-2`}>
                <p>{selection}</p>
                <button className="bg-lightSecondary dark:bg-darkSecondary hover:bg-lightPrimary dark:hover:bg-darkPrimary transition-colors ease-in-out rounded-lg ml-auto mr-2" onClick={() => setIsOpen(!isOpen)}>
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
                <ul className={`absolute top-[100%] left-0 list-none p-0 m-0 w-[150px] rounded-b-lg overflow-hidden bg-lightSecondary dark:bg-darkSecondary ${z}`}>
                    <div className="bg-white opacity-70 w-[80%] h-[2px] ml-auto mr-auto my-[2px] rounded-full"></div>
                    {elements.map((element) => (
                        <li key={element}
                            onClick={() => handleClick(element)}
                            className="bg-lightSecondary dark:bg-darkSecondary hover:bg-lightPrimary dark:hover:bg-darkPrimary transition-colors ease-in-out p-[10px] cursor-pointer"
                        >
                            <p className="text-lightFontTwo dark:text-darkFont font-merri">{element}</p>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}