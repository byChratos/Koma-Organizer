const charData = require("../data/characters.json");
const weaponData = require("../data/weapons.json");
const artifactData = require("../data/artifacts.json");

function getCharIdByName(name){
    for(const entry of charData){
        if(entry["name"] == name){
            return entry["id"];
        }
    }
}

function getWeaponIdByName(name){
    for(const entry of weaponData){
        if(entry["name"] == name){
            return entry["id"];
        }
    }
}

function getArtifactIdByName(name){
    for(const entry of artifactData){
        if(entry["name"] == name){
            return entry["id"];
        }
    }
}

function getCharacterMaterials(id){
    for(const entry of charData){
        if(entry["id"] == id){
            return {
                boss: entry["bossMaterial"],
                talent: entry["talentMaterial"],
            };
        }
    }
}

function getWeaponMaterial(id){
    for(const entry of weaponData){
        if(entry["id"] == id){
            return entry["ascensionMaterial"];
        }
    }
}

function getDayNumber(day){
    if(day == "Monday" || day == "Thursday"){
        return 0;
    }else if(day == "Tuesday" || day == "Friday"){
        return 1;
    }else if(day == "Wednesday" || day == "Saturday"){
        return 2;
    }else{
        return 3;
    }
}

module.exports = { getArtifactIdByName, getCharIdByName, getWeaponIdByName, getCharacterMaterials, getWeaponMaterial, getDayNumber }