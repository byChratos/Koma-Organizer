import React from 'react';
import { getArtifact } from '../../functions/getAssets'

export default function ArtifactIcon(props){

    const artifacts = props.artifact.replace(" ", "-");

    const icon = getArtifact(artifacts.toLowerCase(), props.type)

    return (
        <img className="object-cover" src={ icon } width={ props.width } height={ props.height } />
    );
}