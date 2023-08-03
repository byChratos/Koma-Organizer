import React from 'react';

export default function RemoveButton({ handleButton }){
    return(
            <div className="bg-gray-500 hover:bg-red-500 flex rounded-[25px] w-[100px] h-[50px] cursor-pointer hover:shadow-md">
                <button className='bg-gray-800 text-white rounded-[25px] w-[94px] h-[44px] ml-[3px] mt-[3px]' onClick={() => { handleButton(null) }}>Remove</button>
            </div>
        );
}