import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import AddingButtons from '../components/Buttons/AddingButtons';
import DisplayCard from '../components/DisplayCard';
import DisplayInfo from '../components/DisplayInfo';
import AddingModal from '../components/Modals/AddingModal';


export default function AddPage(){

    const variants = {
        initial: {
            opacity: 0,
            x: "-100%",
        },
        animate: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
            },
        },
        pInitial: {
            opacity: 0,
            scale: 0,
            x: "-60%",
        },
        pAnimate: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
                duration: 0.3,
                delay: 0.5,
            }
        }
    }

    //Modal open or not
    const [modalOpen, setModalOpen] = useState(false);

    //Modal typing
    const [modalType, setModalType] = useState(null);

    const [selectedEntityType, setSelectedEntityType] = useState(null);

    //Selection from modal
    const [selectedEntity, setSelectedEntity] = useState(null);
    const handleEntitySelection = (entity, type) => {
        setModalType(null);
        setModalOpen(false);
        setSelectedEntity(entity);
        setSelectedEntityType(type);
    }

    function add() {
        const response = window.api.saveSelection({name: selectedEntity, type: selectedEntityType});
    }

    function remove() {
        setSelectedEntity(null);
        setSelectedEntityType(null);
    }

    return(
        <motion.div
            className='flex flex-col h-full items-center'
            variants={variants}
            initial="initial"
            animate="animate"
        >
            {/* Card */}
            <div className="w-[500px] minW:h-[550px] minW:mt-[10px] mdW:h-[700px] mdW:mt-[50px] rounded-xl bg-[#393E46] drop-shadow-lg flex flex-col overflow-hidden">
                <div className="w-full minW:h-[50px] mdW:h-[75px] flex items-center justify-center z-20">
                    <h1 className="font-merri text-white text-lg text-center w-fit rounded-xl p-2">Add to Calendar</h1>
                </div>
                <div className="w-full h-full flex flex-col items-center justify-center">
                    {(selectedEntity) ?
                        <>
                            <DisplayCard name={selectedEntity} type={selectedEntityType}/>
                            <DisplayInfo name={selectedEntity} add={add} remove={remove}/>
                        </>
                    :
                        <AddingButtons setModalOpen={setModalOpen} setModalType={setModalType}/>
                    }
                </div>
            </div>

            {/*  Conditional Modal */}
            <AnimatePresence>
                { (modalOpen && modalType === "character") && <AddingModal modalOpen={setModalOpen} handleSelection={ handleEntitySelection } type={modalType} setModalType={ setModalType } />}
                { (modalOpen && modalType === "weapon") && <AddingModal modalOpen={setModalOpen} handleSelection={ handleEntitySelection } type={modalType} setModalType={ setModalType } />}
                { (modalOpen && modalType === "artifact") && <AddingModal modalOpen={setModalOpen} handleSelection={ handleEntitySelection } type={modalType} setModalType={ setModalType } />}
            </AnimatePresence>
        </motion.div>
    );
}