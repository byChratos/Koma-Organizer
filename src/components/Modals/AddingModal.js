import React, { useState } from 'react';
import { motion } from 'framer-motion';

import CharacterList from '../Character/CharacterList';
import WeaponList from '../Weapon/WeaponList';
import ArtifactList from '../Artifacts/ArtifactList';
import Backdrop from './Backdrop';
import SearchBar from './ModalComponents/SearchBar';


const dropIn = {
    hidden: {
        scale: 0,
        opacity: 0,
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.3,
        },
    },
    exit: {
        scale: 0,
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
                    className='bg-[#393E46] w-[80%] h-[75%] mt-[84px] rounded-xl overflow-hidden'
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* Heading - (Search Bar + Close Button) */}
                    <div className='bg-[#222831] w-full h-[15%] inline-block'>
                        <SearchBar handleInput={ handleSearchText } type={type} />
                        <button className="bg-red-500 hover:bg-[#ff4e4e] h-[50px] w-[100px] rounded-xl mt-[1%] mx-[1%] float-right font-merri text-lg text-black" onClick={() => {close()}}>Close</button>
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