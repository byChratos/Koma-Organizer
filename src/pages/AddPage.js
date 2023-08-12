import React, { useState } from 'react';

import AddButton from '../components/Buttons/AddButton';
import RemoveButton from '../components/Buttons/RemoveButton';
import SubmitButton from '../components/Buttons/SubmitButton';

import AddingModal from '../components/Modals/AddingModal';

//TODO Auswählen was man von Character farmen möchte
//TODO Page mit allen Sachen, die man farmen will => einzelne Sachen wie Boss als fertig markierbar, Prioritäten verschiebbar?


export default function AddPage(){

    //Modal open or not
    const [modalOpen, setModalOpen] = useState(false);
    const setModal = (val) => {
        setModalOpen(val);
    }

    //Modal typing
    const [modalType, setModalType] = useState(null);
    const handleModalType = (type) => {
        setModalType(type);
    }

    //Character Button
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const handleChar = (character) => {
        setModalType(null);
        setModalOpen(false);
        setSelectedCharacter(character);
    };

    //Weapon Button
    const [selectedWeapon, setSelectedWeapon] = useState(null);
    const handleWeapon = (weapon) => {
        setModalType(null);
        setModalOpen(false);
        setSelectedWeapon(weapon);
    };

    //Artifact Button // TODO 2 or 4 piece selected?
    const [selectedArtifact, setSelectedArtifact] = useState(null);
    const handleArtifact = (artifact) => {
        setModalType(null);
        setModalOpen(false);
        setSelectedArtifact(artifact);
    };

    return(
        <div className='w-full h-full grid grid-cols-3 grid-rows-6 bg-gradient-to-br from-purple-600 via-blue-500 to-pink-400'>
            {/* // ! Weapon Card */}
            <div className='bg-[#333333] rounded-xl h-[80%] w-[60%] relative mt-[20%] mx-[20%] grid grid-cols-2 grid-rows-10 row-span-5'>
                <h1 className='text-white text-center col-span-2 row-span-1'>Weapon</h1>

                {/* Image div */}
                <div className='bg-red-500 w-full h-full block col-span-2 row-span-6'>
                    {/* Place Image here */}
                </div>
                
                {/* Button div */}
                <div className='inline-block row-span-2 col-span-3'>
                    {/* Add Button */}
                    <AddButton handleButton={ setModal } modalType={ handleModalType } type="weapon" name="Select Weapon" />

                    {/* Debug Button */}
                    {/*<button className='w-[50px] h-[50px] bg-red-500' onClick={() => console.log(selectedWeapon + " " + modalType) }>Debutt</button>*/}

                    {/* Remove Button */}
                    {selectedWeapon ? <RemoveButton handleButton={ handleWeapon } /> : (null)}
                </div>
            </div>

            {/* // ! Character Card */}
            <div className='bg-[#333333] rounded-xl h-[80%] w-[60%] relative mt-[20%] mx-[20%] row-span-5'>
                <h1 className='text-white text-center'>Character</h1>

                {/* Add Button */}
                <AddButton handleButton={ setModal } modalType={ handleModalType } type="character" name="Select Character" />

                {/* Debug Button */}
                <button className='w-[50px] h-[50px] bg-red-500' onClick={() => console.log(selectedCharacter) }>Debutt</button>

                {/* Remove Button */}
                {selectedCharacter ? <RemoveButton handleButton={ handleChar } /> : (null)}
            </div>

            {/* // ! Artifact Card */}
            <div className='bg-[#333333] rounded-xl h-[80%] w-[60%] relative mt-[20%] mx-[20%] row-span-5 row-start-1 col-start-3'>
                <h1 className='text-white text-center'>Artifact</h1>

                {/* Add Button */}
                <AddButton handleButton={ setModal } modalType={ handleModalType } type="artifact" name="Select Artifact" />

                {/* Debug Button */}
                <button className='w-[50px] h-[50px] bg-red-500' onClick={() => console.log(selectedArtifact + " " + modalType) }>Debutt</button>

                {/* Remove Button */}
                {selectedArtifact ? <RemoveButton handleButton={ handleArtifact } /> : (null)}
            </div>

            {/* // ! Submit Button */}
            { (selectedArtifact || selectedCharacter || selectedWeapon) && <SubmitButton className="col-start-1 row-start-6 col-span-3 w-[80%] ml-[10%]" selectedCharacter={selectedCharacter} selectedWeapon={selectedWeapon} selectedArtifact={selectedArtifact}/>}

            {/* // ! Conditional Modal */}
            { (modalOpen && modalType === "character") && <AddingModal modalOpen={setModal} handleSelection={ handleChar } type={modalType} setModalType={ handleModalType } />}
            { (modalOpen && modalType === "weapon") && <AddingModal modalOpen={setModal} handleSelection={ handleWeapon } type={modalType} setModalType={ handleModalType } />}
            { (modalOpen && modalType === "artifact") && <AddingModal modalOpen={setModal} handleSelection={ handleArtifact } type={modalType} setModalType={ handleModalType } />}
        </div>
    );
}