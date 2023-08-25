import charData from "../data/characters.json";
import weaponData from "../data/weapons.json";
import artifactData from "../data/artifacts.json";

import farmData from "../data/materials.json";
import bossData from "../data/bossMaterials.json";


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

export function getAssetById(object, id, imageType){
    if(object == "character"){
        for(const char of charData){
            if(char["id"] == id){
                return char[imageType];
            }
        }
    }else if(object == "weapon"){
        for(const weapon of weaponData){
            if(weapon["id"] == id){
                return weapon[imageType];
            }
        }
    }else if(object == "artifact"){
        for(const artifact of artifactData){
            if(artifact["id"] == id){
                return artifact[imageType];
            }
        }
    }else if(object == "material"){
        for(const material of farmData){
            if(material["id"] == id){
                return material[imageType];
            }
        }
    }else if(object == "bossMaterial"){
        for(const material of bossData){
            if(material["id"] == id){
                return material[imageType];
            }
        }
    }
}

//! Inserts the element into the object at the specified priority
function insert(what, into, priority){
    return into;
}

//TODO
//! Returns dict of farmable stuff today, sorted by Priority => first element == Top Prio, 
export function getFarmable(day, calendar){

    let farmable = [];

    for(const entry of calendar){
        var type = entry["type"];

        if(type == "character"){
            //*Stores if bosses or/and talents should be farmed or not
            var boss = entry["bossId"];
            var talents = entry["talentsId"];

            if(entry["talents"] != false || entry["boss"] != false){

                let available;

                if(entry["talents"] != false){
                    for(const material of farmData){
                        if(entry["talentsId"] == material["id"]){
                            available = (day == material["day"]);
                            if(day == 3){
                                available = true;
                            }
                            break;
                        }
                    }
                }

                if(!available){
                    talents = false;
                }

                //! Only push if either Talents are available or boss is active
                if(available || entry["boss"] != false){
                    var newTalent = {
                        charName: entry["name"],
                        charId: entry["id"],
                        charUrl: getAssetById("character", entry["id"], "icon"),
                        type: "character",
                        bossId: boss,
                        bossUrl: getAssetById("bossMaterial", boss, "icon"),
                        talentId: talents,
                        talentUrl: getAssetById("material", talents, "icon"),
                    }
    
                    farmable.push(newTalent);
                }
            }
        }else if(type == "weapon"){

            let available;
            let url;

            for(const material of farmData){
                if(entry["material"] == material["id"]){
                    available = (day == material["day"]);
                    if(day == 3){
                        available = true;
                    }
                    if(available){
                        url = material["icon"];
                    }
                    break;
                }
            }

            if(available){
                var newWeapon = {
                    weaponName: entry["name"],
                    weaponId: entry["id"],
                    weaponUrl: getAssetById("weapon", entry["id"], "icon"),
                    type: "weapon",
                    material: entry["material"],
                    materialUrl: url,
                }
    
                farmable.push(newWeapon);
            }
        }else if(type == "artifact"){
            var newArtifact = {
                artifactName: entry["name"],
                artifactId: entry["id"],
                artifactUrl: getAssetById("artifact", entry["id"], "icon"),
                type: "artifact",
            }

            farmable.push(newArtifact);
        }
    }

    return farmable;
}