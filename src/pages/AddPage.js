import React, { useState } from 'react';
import '../style/page.scss';

import SearchBarCharacter from '../components/Character/CharacterSearch';
import SearchBarWeapon from '../components/Weapon/WeaponSearch';
import SearchBarArtifact from '../components/Artifacts/ArtifactSearch';

import CharacterSelected from '../components/Character/CharacterSelected'


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
        <div className='addContainer'>
            <div className={`characterAdd${selectedCharacter ? ' active' : ''}`}>
                {selectedCharacter ? <CharacterSelected character={ selectedCharacter } width={dimensions.width/3} height={dimensions.height}/> : <SearchBarCharacter onClickButton={ handleCharButtonClick } />}
            </div>

            <div className='weaponAdd'>
                <SearchBarWeapon />
            </div>

            <div className='artifactAdd'>
                <SearchBarArtifact />
            </div>
        </div>
    );
}