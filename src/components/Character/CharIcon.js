import React from 'react';

import { getChar } from '../../functions/getAssets'

export default function CharIcon({ character, type, width, height }){

    const lCharacter = character.replace(" ", "-");

    const icon = getChar(lCharacter.toLowerCase(), type)

    return (
        <img className="object-cover inline-block relative" src={ icon } width={ width } height={ height } />
    );
}