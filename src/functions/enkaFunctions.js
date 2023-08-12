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

export function getCharIdByName(name){
    for(const char of charData){
        if(name === char["name"]){
            return char["id"];
        }
    }
}