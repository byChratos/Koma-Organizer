import React from 'react';

//import { getAsset } from '../functions/getAssets';
import { getAsset, getAssetById } from '../functions/enkaFunctions';

export default function GenshinImage({ id, objectType, imageType, width, height, data }){

    const image = getAssetById(objectType, id, imageType, data);

    /*async function log(){
        await window.api.log({ message: data })
    }

    log();*/

    return (
        <img className="object-cover inline-block relative" src={ image } width={ width } height={ height } />
    );
}