import React from 'react';

import { getAsset } from '../functions/getAssets'

export default function GenshinImage({ objectKey, objectType, imageType, width, height }){

    let image = getAsset(objectType, imageType, objectKey);

    return (
        <img className="object-cover inline-block relative" src={ image } width={ width } height={ height } />
    );
}