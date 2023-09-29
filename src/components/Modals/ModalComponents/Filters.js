import React from "react";

export default function Filters({ filters, setFilters, type }) {
    return(
        <>
            {type == "character" && 
                <div className="w-full h-[60px] pl-3 flex flex-row items-center">
                    <button className={`rounded-full p-1 h-[40px] w-[100px] ${filters.character.fourStars ? 'bg-lightPrimary dark:bg-darkPrimary hover:bg-lightSecondary dark:hover:bg-darkSecondary drop-shadow-md' : 'bg-lightBGTwo dark:bg-darkBG hover:bg-lightBG dark:hover:bg-darkBGTwo hover:drop-shadow-md'}`}
                            onClick={() => {setFilters({ ...filters, character: { ...filters.character, fourStars: !filters.character.fourStars }})}}
                    >
                        <div className="flex flex-row w-full h-full items-center justify-center">
                            <p className="text-lightFont dark:text-darkFont font-merri">4 Stars</p>
                        </div>
                    </button>

                    <button className={`rounded-full ml-2 p-1 h-[40px] w-[100px] ${filters.character.fiveStars ? 'bg-lightPrimary dark:bg-darkPrimary hover:bg-lightSecondary dark:hover:bg-darkSecondary drop-shadow-md' : 'bg-lightBGTwo dark:bg-darkBG hover:bg-lightBG dark:hover:bg-darkBGTwo hover:drop-shadow-md'}`}
                            onClick={() => {setFilters({ ...filters, character: { ...filters.character, fiveStars: !filters.character.fiveStars }})}}
                    >
                        <div className="flex flex-row w-full h-full items-center justify-center">
                            <p className="text-lightFont dark:text-darkFont font-merri">5 Stars</p>
                        </div>
                    </button>
                </div>
            }
            {type == "artifact" &&
                <div>

                </div>
            }
            {type == "weapon" &&
                <div className="w-full h-[60px] pl-3 flex flex-row items-center">

                    <button className={`rounded-full p-1 h-[40px] w-[100px] ${filters.weapon.oneStars ? 'bg-lightPrimary dark:bg-darkPrimary hover:bg-lightSecondary dark:hover:bg-darkSecondary drop-shadow-md' : 'bg-lightBGTwo dark:bg-darkBG hover:bg-lightBG dark:hover:bg-darkBGTwo hover:drop-shadow-md'}`}
                            onClick={() => {setFilters({ ...filters, weapon: { ...filters.weapon, oneStars: !filters.weapon.oneStars }})}}
                    >
                        <div className="flex flex-row w-full h-full items-center justify-center">
                            <p className="text-lightFont dark:text-darkFont font-merri">1 Stars</p>
                        </div>
                    </button>

                    <button className={`rounded-full ml-2 p-1 h-[40px] w-[100px] ${filters.weapon.twoStars ? 'bg-lightPrimary dark:bg-darkPrimary hover:bg-lightSecondary dark:hover:bg-darkSecondary drop-shadow-md' : 'bg-lightBGTwo dark:bg-darkBG hover:bg-lightBG dark:hover:bg-darkBGTwo hover:drop-shadow-md'}`}
                            onClick={() => {setFilters({ ...filters, weapon: { ...filters.weapon, twoStars: !filters.weapon.twoStars }})}}
                    >
                        <div className="flex flex-row w-full h-full items-center justify-center">
                            <p className="text-lightFont dark:text-darkFont font-merri">2 Stars</p>
                        </div>
                    </button>

                    <button className={`rounded-full ml-2 p-1 h-[40px] w-[100px] ${filters.weapon.threeStars ? 'bg-lightPrimary dark:bg-darkPrimary hover:bg-lightSecondary dark:hover:bg-darkSecondary drop-shadow-md' : 'bg-lightBGTwo dark:bg-darkBG hover:bg-lightBG dark:hover:bg-darkBGTwo hover:drop-shadow-md'}`}
                            onClick={() => {setFilters({ ...filters, weapon: { ...filters.weapon, threeStars: !filters.weapon.threeStars }})}}
                    >
                        <div className="flex flex-row w-full h-full items-center justify-center">
                            <p className="text-lightFont dark:text-darkFont font-merri">3 Stars</p>
                        </div>
                    </button>

                    <button className={`rounded-full ml-2 p-1 h-[40px] w-[100px] ${filters.weapon.fourStars ? 'bg-lightPrimary dark:bg-darkPrimary hover:bg-lightSecondary dark:hover:bg-darkSecondary drop-shadow-md' : 'bg-lightBGTwo dark:bg-darkBG hover:bg-lightBG dark:hover:bg-darkBGTwo hover:drop-shadow-md'}`}
                            onClick={() => {setFilters({ ...filters, weapon: { ...filters.weapon, fourStars: !filters.weapon.fourStars }})}}
                    >
                        <div className="flex flex-row w-full h-full items-center justify-center">
                            <p className="text-lightFont dark:text-darkFont font-merri">4 Stars</p>
                        </div>
                    </button>

                    <button className={`rounded-full ml-2 p-1 h-[40px] w-[100px] ${filters.weapon.fiveStars ? 'bg-lightPrimary dark:bg-darkPrimary hover:bg-lightSecondary dark:hover:bg-darkSecondary drop-shadow-md' : 'bg-lightBGTwo dark:bg-darkBG hover:bg-lightBG dark:hover:bg-darkBGTwo hover:drop-shadow-md'}`}
                            onClick={() => {setFilters({ ...filters, weapon: { ...filters.weapon, fiveStars: !filters.weapon.fiveStars }})}}
                    >
                        <div className="flex flex-row w-full h-full items-center justify-center">
                            <p className="text-lightFont dark:text-darkFont font-merri">5 Stars</p>
                        </div>
                    </button>
                </div>
            }
        </>
    );
}