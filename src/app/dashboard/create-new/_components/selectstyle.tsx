"use client"

import Image from 'next/image'
import React, { useState } from 'react'

type SelectStyleProps = {
    onUserSelect: (key: string, value: string) => void;
}

function SelectStyle({onUserSelect}: SelectStyleProps) {
    const styleOptions = [
        {
            name:"Realistic",
            image:"/real.png"
        },
        {
            name:"Cartoon",
            image:"/cartoon.png"
        },
        {
            name:"Comic",
            image:"/comic.png"
        },
        {
            name:"Water Color",
            image:"/water.png"
        },  
        {
            name:"GTA-Style",
            image:"/gta.png"
        },

    ]

    const [selectedOption, setSelectedOption] = useState<string | null>(null);


    return (
    <div className="mt-7">
        <h2 className="font-bold text-2xl text-primary">Style</h2>
        <p className="text-gray-500">
        Choose the style you want your video to be generated like!
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-3">
        {styleOptions.map((item) => (
            <div
            key={item.name}
            role="button"
            tabIndex={0}
            onClick={() => {
                setSelectedOption(item.name);
                onUserSelect("imageStyle", item.name);
                console.log("Selected:", item.name);
            }}
            className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl border-2 ${
                selectedOption === item.name
                ? "border-primary"
                : "border-transparent"
            }`}
            >
            <div className="aspect-[1/2] w-full relative rounded-lg overflow-hidden">
                <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                />
            </div>
            <h2 className="absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg">
                {item.name}
            </h2>
            </div>
        ))}
        </div>
    </div>
    );

}

export default SelectStyle