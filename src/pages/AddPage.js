import React, { useState } from 'react';

import SearchBarCharacter from '../components/Character/CharacterSearch';
import SearchBarWeapon from '../components/Weapon/WeaponSearch';
import SearchBarArtifact from '../components/Artifacts/ArtifactSearch';

import CharacterSelected from '../components/Character/CharacterSelected'
import WeaponSelected from '../components/Weapon/WeaponSelected';


export default function AddPage(){

    //Dimensions
    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    //Character Button
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const handleCharButtonClick = (character) => {
        setSelectedCharacter(character);
    };

    //Weapon Button
    const [selectedWeapon, setSelectedWeapon] = useState(null);

    const handleWeaponButtonClick = (weapon) => {
        setSelectedWeapon(weapon);
    }

    //Artifact Button // TODO 2 or 4 piece selected?


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
    );
}