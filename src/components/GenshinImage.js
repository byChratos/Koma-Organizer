import React from 'react';

import { getAsset, getChar } from '../functions/getAssets'

export default function GenshinImage({ objectName, objectType, imageType, width, height }){

    const name = objectName.replace(" ", "-").toLowerCase();

    let image = getAsset(objectType, name, imageType);

    /*if(objectType == "characters"){
        image = getChar(name, imageType)
    }else{
        image = getAsset(objectType, name, imageType)
    }*/

    return (
        <img className="object-cover inline-block relative" src={ image } width={ width } height={ height } />
    );
}