import React from 'react';

import SearchBarCharacter from './Character/CharacterSearch';
import SearchBarWeapon from './Weapon/WeaponSearch';
import SearchBarArtifact from './Artifacts/ArtifactSearch';


export function AddingModal({ type }) {

    if(type === "character"){
        return (

            <div className='absolute w-9/10 bg-black'>
                <SearchBarCharacter />
                <CharacterList />
            </div>

        );
    }else if(type === "weapon"){
        return (

            <div className='absolute w-9/10 bg-black'>
                <SearchBarWeapon />
                <WeaponList />
            </div>

        );
    }else{
        return (

            <div className='absolute w-9/10 bg-black'>
                <SearchBarArtifact />
                <ArtifactList />
            </div>
            
        );
    }
}