export function getChar(name, type) {
    const charUrl = `https://api.genshin.dev/characters/${name}/${type}`;
    console.log(charUrl);
    return charUrl;
}