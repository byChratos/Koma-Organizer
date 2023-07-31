import React from 'react';
import { getWeapon } from '../../functions/getAssets'

export default function WeaponIcon(props){

    const weapon = props.weapon.replace(" ", "-");

    const icon = getWeapon(weapon.toLowerCase(), props.type)

    return (
        <img className="object-cover" src={ icon } width={ props.width } height={ props.height } />
    );
}