import React from 'react';

import SearchBarCharacter from '../components/Character/CharacterSearch';
import SearchBarWeapon from '../components/Weapon/WeaponSearch';
import SearchBarArtifact from '../components/Artifacts/ArtifactSearch';


export default function AddPage(){

    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

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
            <div className='characterAdd'>
                <SearchBarCharacter />
                {/* <CharIcon className="characterCard" character="ayaka" type="gacha-card" height={ dimensions.height } width={ dimensions.width/3 }/> */}
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