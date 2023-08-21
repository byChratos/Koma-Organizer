import charData from "../data/characters.json";
import weaponData from "../data/weapons.json";
import artifactData from "../data/artifacts.json";

import calendarData from "../../calendar.json";
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

function getAssetById(object, id, imageType){
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
export function getFarmable(day){

    let farmable = [];

    for(const entry of calendarData){
        var type = entry["type"];

        if(type == "character"){
            //*Stores if bosses or/and talents should be farmed or not
            var boss = entry["boss"];
            var talents = entry["talents"];

            if(talents != false){

                let available;

                for(const material of farmData){
                    if(entry["talents"] == material["id"]){
                        available = (day == material["day"]);
                        if(day == 3){
                            available = true;
                        }
                        break;
                    }
                }

                if(available){
                    var newTalent = {
                        name: entry["name"],
                        id: entry["id"],
                        entityUrl: getAssetById("character", entry["id"], "icon"),
                        type: "talent",
                        matId: talents,
                        materialUrl: getAssetById("material", talents, "icon"),
                    }
    
                    farmable.push(newTalent);
                }
            }

            if(boss != false){
                var newBoss = {
                    name: entry["name"],
                    id: entry["id"],
                    entityUrl: getAssetById("character", entry["id"], "icon"),
                    type: "boss",
                    matId: boss,
                    materialUrl: getAssetById("bossMaterial", boss, "icon"),
                }
                
                farmable.push(newBoss);
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
                    name: entry["name"],
                    id: entry["id"],
                    entityUrl: getAssetById("weapon", entry["id"], "icon"),
                    type: "weapon",
                    material: entry["material"],
                    materialUrl: url,
                }
    
                farmable.push(newWeapon);
            }
        }else if(type == "artifact"){
            var newArtifact = {
                name: entry["name"],
                id: entry["id"],
                entityUrl: getAssetById("artifact", entry["id"], "icon"),
                type: "artifact",
            }

            farmable.push(newArtifact);
        }
    }

    return farmable;
}