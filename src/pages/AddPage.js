import React from 'react';

import CharIcon from '../components/CharIcon';
import SearchBar from '../components/CharacterSearch';


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
                <SearchBar />
                {/* <CharIcon className="characterCard" character="ayaka" type="gacha-card" height={ dimensions.height } width={ dimensions.width/3 }/> */}
            </div>
            <div className='weaponAdd'>
                <p>Weapon</p>
            </div>
            <div className='artifactAdd'>
                <p>Artifact</p>
            </div>
        </div>
    );
}