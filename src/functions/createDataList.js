const fs = require("fs");
const { getTalentMaterialId, getBossMaterialId } = require("../functions/getCharacterMaterials");
const { getWeaponMaterialId } = require("../functions/getWeaponMaterials");

//TODO Weekly Boss Material?

function createCharJson(enka){
    const characters = enka.getAllCharacters();
    let charactersArray = [];
    let i = 0;
    for(const char of characters){
        
        if(char.name.get("en") === "Traveler"){
            continue;
        }

        const newChar = {
            key: i,
            id: char.id,
            name: char.name.get("en"),
            icon: char.icon.url,
            sideIcon: char.sideIcon.url,
            splash: char.splashImage.url,
            gachaSlice: char.gachaSlice.url,
            bossMaterial: getBossMaterialId(char),
            talentMaterial: getTalentMaterialId(char),
        }
        charactersArray.push(newChar);
        i += 1;
    }
    const jsonString = JSON.stringify(charactersArray, null, 2);
    fs.writeFileSync("./src/data/characters.json", jsonString);
}

function createWeaponJson(enka){
    const weapons = enka.getAllWeapons();
    let weaponsArray = [];
    let i = 0;
    for(const weapon of weapons){
        const newWeapon = {
            key: i,
            id: weapon.id,
            name: weapon.name.get("en"),
            icon: weapon.icon.url,
            ascensionMaterial: getWeaponMaterialId(weapon),
        }
        weaponsArray.push(newWeapon);
        i += 1;
    }
    const jsonString = JSON.stringify(weaponsArray, null, 2);
    fs.writeFileSync("./src/data/weapons.json", jsonString);
}

function createArtifactJson(enka){
    const artifacts = enka.getAllArtifactSets();
    let artifactsArray = [];
    let i = 0;
    for(const artifact of artifacts){
        const newArtifact = {
            key: i,
            id: artifact.id,
            name: artifact.name.get("en"),
            icon: artifact.icon.url,
        }
        artifactsArray.push(newArtifact);
        i += 1;
    }
    const jsonString = JSON.stringify(artifactsArray, null, 2);
    fs.writeFileSync("./src/data/artifacts.json", jsonString);
}

function createJsonData(enka){

    createCharJson(enka);
    createWeaponJson(enka);
    createArtifactJson(enka);
}

module.exports = { createJsonData }