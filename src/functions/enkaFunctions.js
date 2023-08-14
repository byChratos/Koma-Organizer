import charData from "../data/characters.json";
import weaponData from "../data/weapons.json";
import artifactData from "../data/artifacts.json";

import calendarData from "../../calendar.json";
import farmData from "../data/materials.json";


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
                        type: "talent",
                        talent: talents,
                    }
    
                    farmable.push(newTalent);
                }
            }

            if(boss != false){
                var newBoss = {
                    name: entry["name"],
                    id: entry["id"],
                    type: "boss",
                    boss: boss,
                }
                
                farmable.push(newBoss);
            }
        }else if(type == "weapon"){

            let available;

            for(const material of farmData){
                if(entry["material"] == material["id"]){
                    available = (day == material["day"]);
                    if(day == 3){
                        available = true;
                    }
                    break;
                }
            }

            if(available){
                var newWeapon = {
                    name: entry["name"],
                    id: entry["id"],
                    type: "weapon",
                    material: entry["material"],
                }
    
                farmable.push(newWeapon);
            }
        }else if(type == "artifact"){
            var newArtifact = {
                name: entry["name"],
                id: entry["id"],
                type: "artifact",
            }

            farmable.push(newArtifact);
        }
    }

    return farmable;
}