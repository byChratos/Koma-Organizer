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

const buttons = {
    initial: {
        scale: 1,
    },
    hover: {
        scale: 1.15,
        transition: {
            duration: 0.2,
        }
    },
    tap: {
        scale: 0.95,
    }
}

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
                    className='bg-lightBG dark:bg-darkBGTwo w-[80%] h-[75%] mt-[84px] rounded-xl overflow-hidden'
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* Heading - (Search Bar + Close Button) */}
                    <div className='bg-lightBGTwo dark:bg-darkBG w-full h-[15%] inline-block drop-shadow-md'>
                        <SearchBar handleInput={ handleSearchText } type={type} />
                        <motion.button 
                            className="bg-red-500 h-[50px] w-[100px] rounded-xl mt-[1%] mx-[1%] float-right font-merri text-lg text-black"
                            onClick={() => {close()}}
                            variants={buttons}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                        >Close</motion.button>
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