import React, { useState } from 'react';
import { motion } from 'framer-motion';

import SearchBarCharacter from './Character/CharacterSearch';
import CharacterList from './Character/CharacterList';

import SearchBarWeapon from './Weapon/WeaponSearch';
import WeaponList from './Weapon/WeaponList';

import SearchBarArtifact from './Artifacts/ArtifactSearch';
import ArtifactList from './Artifacts/ArtifactList';

import Backdrop from './Backdrop';


const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

export default function AddingModal({ modalOpen, handleSelection, type, setModalType }) {

        const [searchText, setSearchText] = useState(null);
        const handleSearchText = (text) => {
            setSearchText(text);
        }

        function close(){
            setModalType(null);
            modalOpen(false);
        }

        return (
            <Backdrop handleClick={ modalOpen } setModalType={ setModalType }>
                <motion.div
                    onClick={(e) => e.stopPropagation()}
                    className='bg-gray-800 w-[80%] h-[75%] rounded-[20px]'
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* Heading - (Search Bar + Close Button) */}
                    <div className='bg-[#333333] rounded-t-[20px] w-full h-[15%] inline-block'>
                        { (type === "character") && <SearchBarCharacter handleInput={ handleSearchText }/>}
                        { (type === "weapon") && <SearchBarWeapon handleInput={ handleSearchText }/>}
                        { (type === "artifact") && <SearchBarArtifact handleInput={ handleSearchText }/>}
                        <button className="bg-red-500 hover:bg-[#ff4e4e] h-[50px] w-[6%] rounded-[20px] mt-[1%] mx-[1%] float-right" onClick={() => {close()}}>Close</button>
                    </div>

                    {/* Content - (List of items) */}
                    <div className='w-full h-[85%] overflow-y-auto overflow-x-hidden'>
                        { (type === "character") && <CharacterList handleClick={ handleSelection } input={searchText} />}
                        { (type === "weapon") && <WeaponList handleClick={ handleSelection } input={searchText} />}
                        { (type === "artifact") && <ArtifactList handleClick={ handleSelection } input={searchText} />}
                    </div>

                </motion.div>
            </Backdrop>
        );
}