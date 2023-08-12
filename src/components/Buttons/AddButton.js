import React from 'react';

export default function AddButton({ handleButton, modalType, type, name }){

    function button() {
        modalType(type);
        handleButton(true);
    }

    return(
            <div className="bg-gray-500 hover:bg-gradient-to-r from-blue-500 to-purple-400 rounded-[25px] w-[100px] h-[50px] cursor-pointer hover:shadow-md hover:shadow-blue-500">
                
                <button className='bg-gray-800 text-white rounded-[25px] w-[94px] h-[44px] ml-[3px] mt-[3px]' onClick={() => { button() }}>{ name }</button>
            
            </div>
        );
}