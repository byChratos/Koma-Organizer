function getCharIdByName(name, data){
    for(const entry of data){
        if(entry["name"] == name){
            return entry["id"];
        }
    }
}

function getWeaponIdByName(name, data){
    for(const entry of data){
        if(entry["name"] == name){
            return entry["id"];
        }
    }
}

function getArtifactIdByName(name, data){
    for(const entry of data){
        if(entry["name"] == name){
            return entry["id"];
        }
    }
}

function getCharacterMaterials(id, data){
    for(const entry of data){
        if(entry["id"] == id){
            return {
                boss: entry["bossMaterial"],
                talent: entry["talentMaterial"],
            };
        }
    }
}

function getWeaponMaterial(id, data){
    for(const entry of data){
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

function getMaterialNameById(type, id, data){
    if(type === "boss"){
        for(const entry of data){
            if(entry["id"] == id){
                return entry["name"];
            }
        }
    }else if(type === "talent" || type === "weapon"){
        for(const entry of data){
            if(entry["id"] == id){
                return entry["name"];
            }
        }
    }
}

module.exports = { getArtifactIdByName, getCharIdByName, getWeaponIdByName, getCharacterMaterials, getWeaponMaterial, getDayNumber, getMaterialNameById }