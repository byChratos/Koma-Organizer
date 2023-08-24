import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Add() {

    const navigate = useNavigate();

    return(
        //Change Page to addition
        <button className="bg-blue-500 border text-black w-8 h-8 rounded-full text-xl" onClick={() => navigate("/add")}>+</button>
    );
}