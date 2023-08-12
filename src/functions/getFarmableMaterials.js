//TODO Array with all Artifacts => Can be displayed every day
//TODO Array with all boss materials => Can be displayed every day
//TODO Array with all materials day specific

//! Funktion iteriert über data von calendar.json => für jedes Element, falls Artefakt -> Artefakt farmable, falls Waffe -> check ob Waffe farmable heute, falls Character -> Boss farmable + check ob Talente farmable
import farmData from "../data/materials.json";
import calendarData from "../../calendar.json";
import characterData from "../data/characters.json";
import weaponData from "../data/weapons.json";

import { getCharIdByName } from "./enkaFunctions";

function getFarmable(day){

    //TODO List of Chars, Weapons & Artifacts inside the Calendar
    let calendarChars = [];
    let calendarWeapons = [];
    let calendarArtifacts = [];

    for(const entry of calendarData){
        if(entry["type"] == "character"){
            calendarChars.push("C");
        }else if(entry["type"] == "weapon"){
            calendarWeapons.push("W");
        }else{
            calendarArtifacts.push("A")
        }
    }

    //TODO Iterate over Chars and Weapons => Add all Char Bosses to list, Talent Books if needed, Weapon Materials if needed.


}