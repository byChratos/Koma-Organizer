const fs = require("fs");
const { getTalentMaterialId, getBossMaterialId } = require("../functions/getCharacterMaterials");
const { getWeaponMaterialId } = require("../functions/getWeaponMaterials");

//TODO Weekly Boss Material?

//TODO Make data list creating after update is downloaded (in worker)

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

async function createMaterialJson(enka){
    //TODO make users select their server (EU, NA, Asia)
    const res = await fetch("https://gitlab.com/Dimbreath/AnimeGameData/-/raw/master/ExcelBinOutput/DungeonEntryExcelConfigData.json");
    const json = await res.json();

    const domains = json.filter(d => d.isDailyRefresh);

    let newData = [];

    //Iterate over the normal days (excluding sunday as everything is available on sundays)
    for(let i = 0; i < 3; i++){
        const talentBooks = domains
            .filter(d => d.type === "DUNGEN_ENTRY_TYPE_AVATAR_TALENT")
            .flatMap(d => d.descriptionCycleRewardList[i]);
    
        const weaponMaterials = domains
            .filter(d => d.type === "DUNGEN_ENTRY_TYPE_WEAPON_PROMOTE")
            .flatMap(d => d.descriptionCycleRewardList[i]);

        for(const talentBook of talentBooks){

            var material = enka.getMaterialById(talentBook);

            newData.push({
                name: material.name.get("en"),
                type: "talentBook",
                id: talentBook,
                day: i,
                rarity: material.stars,
                icon: material.icon.url,
            });
        }

        for(const weaponMaterial of weaponMaterials){

            var material = enka.getMaterialById(weaponMaterial);

            newData.push({
                name: material.name.get("en"),
                type: "weaponMaterial",
                id: weaponMaterial,
                day: i,
                rarity: material.stars,
                icon: material.icon.url,
            });

        }
    }

    const jsonString = JSON.stringify(newData, null, 2);
    fs.writeFileSync("./src/data/materials.json", jsonString);
}

function createJsonData(enka){

    createCharJson(enka);
    createWeaponJson(enka);
    createArtifactJson(enka);
    createMaterialJson(enka);
}

module.exports = { createJsonData }