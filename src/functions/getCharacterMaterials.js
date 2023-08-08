function getBossMaterialId(char){
    const items = char.getAscensionData(2).cost.items;

    for(const item of items){
        if(item.material.stars == 4){
            return item.material.id;
        }
    }
}

function getTalentMaterialId(char){
    const items = char.elementalSkill.getUpgradeCost(2).items;

    for(const item of items){
        if(item.material.stars == 2){
            return item.material.id;
        }
    }
}

module.exports = { getBossMaterialId, getTalentMaterialId }