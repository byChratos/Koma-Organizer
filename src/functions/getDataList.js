async function getCharacterList() {
    const response = await fetch(`https://genshin.jmp.blue/characters`);
    const chars = response.json();
    return chars;
}

async function getWeaponsList() {
    const response = await fetch(`https://genshin.jmp.blue/weapons`);
    const weapons = response.json();
    return weapons;
}

async function getArtifactList() {
    const response = await fetch(`https://genshin.jmp.blue/artifacts`);
    const artifacts = response.json();
    return artifacts;
}

module.exports = { getCharacterList, getWeaponsList, getArtifactList };