import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AddingButtons from '../components/Buttons/AddingButtons';
import DisplayCard from '../components/DisplayCard';
import DisplayInfo from '../components/DisplayInfo';
import AddingModal from '../components/Modals/AddingModal';
import PopUp from '../components/Modals/PopUp';


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

    const[saved, setSaved] = useState(false);
    const[popup, setPopup] = useState(false);

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

    async function add() {
        const response = await window.api.saveSelection({name: selectedEntity, type: selectedEntityType});
        if(response){
            setSaved(true);
            setPopup(true);
            window.api.log({ message: `ADD: Added ${selectedEntity}` })
        }else{
            setPopup(true);
            window.api.log({ message: `ADD: ${selectedEntity} already is in calendar`})
        }
    }

    function close(v){
        setSaved(false);
        setPopup(false);
        setSelectedEntity(null);
        setSelectedEntityType(null);
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

            {(popup) ? (saved) ? <PopUp message={`Successfully added ${selectedEntity} to calendar!`} setModalOpen={close} closeEnabled={true} /> : <PopUp message={`${selectedEntity} already is in calendar!`} setModalOpen={close} closeEnabled={true} /> : null}

            {/* Card */}
            <div className="w-[500px] minW:h-[550px] minW:mt-[10px] mdW:h-[700px] mdW:mt-[50px] rounded-xl bg-lightBGTwo dark:bg-darkBGTwo drop-shadow-lg flex flex-col overflow-hidden">
                <div className="w-full minW:h-[50px] mdW:h-[75px] flex items-center justify-center z-20">
                    <h1 className="font-merri text-lightFont dark:text-darkFont text-lg text-center w-fit rounded-xl p-2">Add to Calendar</h1>
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