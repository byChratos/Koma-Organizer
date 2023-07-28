import React from 'react';
import { getChar } from './fetchCharacterImage'

export default function CharIcon(props){

    const character = props.character.replace(" ", "-");

    const icon = getChar(character.toLowerCase(), props.type)

    return (
        <img src={ icon } width={ props.width } height={ props.height } />
    );
}