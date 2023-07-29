export function getChar(name, type) {
    const charUrl = `https://genshin.jmp.blue/characters/${name}/${type}`;
    return charUrl;
}

export function getWeapon(name, type) {
    const weaponUrl = `https://genshin.jmp.blue/weapons/${name}/${type}`;
    return weaponUrl;
}

export function getArtifact(name, type) {
    const artifactUrl = `https://genshin.jmp.blue/artifacts/${name}/${type}`
    return artifactUrl;
}