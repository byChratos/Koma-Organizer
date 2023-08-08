function getWeaponMaterialId(weapon){
    const items = weapon.getAscensionData(2).cost.items;

    for(const item of items){
        if(item.material.stars == 3){
            return item.material.id;
        }
    }
}

module.exports = { getWeaponMaterialId }