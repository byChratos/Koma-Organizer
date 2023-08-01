import React from 'react';

import { getAsset } from '../functions/getAssets'

export default function GenshinImage({ objectName, objectType, imageType, width, height }){

    const name = objectName.replace(" ", "-").toLowerCase();

    console.log(name);

    const image = getAsset(objectType, name, imageType)

    return (
        <img className="object-cover inline-block relative" src={ image } width={ width } height={ height } />
    );
}