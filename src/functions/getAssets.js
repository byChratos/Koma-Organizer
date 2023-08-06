import charData from "../data/characters.json";
import weaponData from "../data/weapons.json";
import artifactData from "../data/artifacts.json";

export function getAsset(object, type, key) {

    if(object === "character"){
        const charUrl = charData[key][type];
        return charUrl;
    }else if(object === "weapon"){
        const weaponUrl = weaponData[key][type];
        return weaponUrl;
    }else if(object === "artifact"){
        const artifactUrl = artifactData[key][type];
        return artifactUrl;
    }
    
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