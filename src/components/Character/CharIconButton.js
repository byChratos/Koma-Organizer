import React from 'react';

import { getChar } from '../../functions/getAssets'

export default function CharIconButton({ character, type, width, height, onButtonClick }){

    const lCharacter = character.replace(" ", "-");

    const icon = getChar(lCharacter.toLowerCase(), type)

    return (
        <button key={ lCharacter.toLowerCase() } onClick={() => onButtonClick(lCharacter.toLowerCase())}> <img className="charIcon" src={ icon } width={ width } height={ height } /> </button>
    );
}