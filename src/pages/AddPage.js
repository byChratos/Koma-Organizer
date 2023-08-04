import React, { useState } from 'react';

import AddButton from '../components/AddButton';
import RemoveButton from '../components/RemoveButton';

import AddingModal from '../components/AddingModal';


export default function AddPage(){

    //Dimensions
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

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

    React.useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }

        window.addEventListener('resize', handleResize)

        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    })

    return(
        <div className='w-full h-full flex bg-gradient-to-br from-purple-600 via-blue-500 to-pink-400'>
            {/* // ! Weapon Card */}
            <div className='bg-[#333333] rounded-xl h-3/5 w-1/6 relative mt-[10%] ml-[11%] grid grid-cols-2 grid-rows-10'>
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
            <div className='bg-[#333333] rounded-xl h-4/5 w-1/3 relative mt-[5%] ml-[5%]'>
                <h1 className='text-white text-center'>Character</h1>

                {/* Add Button */}
                <AddButton handleButton={ setModal } modalType={ handleModalType } type="character" name="Select Character" />

                {/* Debug Button */}
                <button className='w-[50px] h-[50px] bg-red-500' onClick={() => console.log(selectedCharacter + " " + modalType) }>Debutt</button>

                {/* Remove Button */}
                {selectedCharacter ? <RemoveButton handleButton={ handleChar } /> : (null)}
            </div>

            {/* // ! Artifact Card */}
            <div className='bg-[#333333] rounded-xl h-3/5 w-1/6 relative mt-[10%] ml-[5%]'>
                <h1 className='text-white text-center'>Artifact</h1>

                {/* Add Button */}
                <AddButton handleButton={ setModal } modalType={ handleModalType } type="artifact" name="Select Artifact" />

                {/* Debug Button */}
                <button className='w-[50px] h-[50px] bg-red-500' onClick={() => console.log(selectedArtifact + " " + modalType) }>Debutt</button>

                {/* Remove Button */}
                {selectedArtifact ? <RemoveButton handleButton={ handleArtifact } /> : (null)}
            </div>

            {/* // ! Conditional Modal */}
            { (modalOpen && modalType === "character") && <AddingModal modalOpen={setModal} handleSelection={ handleChar } type={modalType} setModalType={ handleModalType } />}
            { (modalOpen && modalType === "weapon") && <AddingModal modalOpen={setModal} handleSelection={ handleWeapon } type={modalType} setModalType={ handleModalType } />}
            { (modalOpen && modalType === "artifact") && <AddingModal modalOpen={setModal} handleSelection={ handleArtifact } type={modalType} setModalType={ handleModalType } />}
            {/*modalOpen ? <AddingModal modalOpen={setModal} handleSelection={ handleWeapon } type={modalType} setModalType={ handleModalType } /> : (null)*/}
        </div>
    );

    /*return(
        <div className='w-full h-full flex'>
            <div className={`${selectedCharacter ? 'w-1/3 h-full bg-gradient-to-br from-[#9c05ff] to-[#0d85ff] overflow-hidden' : 'w-1/3 h-full bg-gradient-to-br from-[#9c05ff] to-[#0d85ff] overflow-auto'}`}>
                {selectedCharacter ? <CharacterSelected handleButtonClick={ handleCharButtonClick } character={ selectedCharacter } width={dimensions.width/3} height={dimensions.height}/> : <SearchBarCharacter onClickButton={ handleCharButtonClick } />}
            </div>

            <div className='h-full w-1/3 overflow-auto bg-gradient-to-tl from-[#9c05ff] to-[#0d85ff]'>
                {selectedWeapon ? <WeaponSelected handleButtonClick={ handleWeaponButtonClick } weapon={ selectedWeapon } width={dimensions.width/3} height={dimensions.height/3}/> : <SearchBarWeapon onClickButton={ handleWeaponButtonClick } />}
            </div>

            <div className='h-full w-1/3 overflow-auto bg-gradient-to-tr from-[#9c05ff] to-[#0d85ff]'>
                <SearchBarArtifact />
            </div>
        </div>
    );*/
}