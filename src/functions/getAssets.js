export function getAsset(object, name, type) {
    const url = `https://genshin.jmp.blue/${object}/${name}/${type}`;
    return url;
}

export function getChar(name, type) {
    const charUrl = `https://cdn.wanderer.moe/genshin-impact/character-icons/${name}-icon.png`;
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

// Old Asset API https://genshin.jmp.blue
// New Asset API https://api.wanderer.moe/game/genshin-impact