import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Add() {

    const navigate = useNavigate();

    return(
        //Change Page to addition
        <button className="addButton" onClick={() => navigate("/add")}>+</button>
    );
}