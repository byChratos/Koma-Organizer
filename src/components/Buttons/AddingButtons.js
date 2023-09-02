import React from "react";

export default function AddingButtons({ setModalOpen, setModalType }) {
    return(
        <div className="bg-[#00ADB5] flex flex-col w-[400px] h-fit rounded-xl items-center justify-center">
            <button className="w-[300px] h-[75px] hover:bg-[#1c6569] mt-[10px] rounded-xl text-white font-merri text-lg" onClick={() => {setModalType("artifact"); setModalOpen(true)}}>
                Artifact
            </button>
            <button className="w-[300px] h-[75px] hover:bg-[#1c6569] mt-[10px] rounded-xl text-white font-merri text-lg" onClick={() => {setModalType("character"); setModalOpen(true)}}>
                Character
            </button>
            <button className="w-[300px] h-[75px] hover:bg-[#1c6569] mt-[10px] rounded-xl text-white font-merri text-lg mb-[10px]" onClick={() => {setModalType("weapon"); setModalOpen(true)}}>
                Weapon
            </button>
        </div>
    );
}