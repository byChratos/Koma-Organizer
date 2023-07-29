import React from 'react';
import { getChar } from '../functions/getAssets'

export default function CharIcon(props){

    const character = props.character.replace(" ", "-");

    const icon = getChar(character.toLowerCase(), props.type)

    return (
        <img className="charIcon" src={ icon } width={ props.width } height={ props.height } />
    );
}