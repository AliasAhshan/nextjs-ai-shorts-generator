"use client"

import { CircleUser, FileVideo, PanelsTopLeft, ShieldPlus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function SideNav() {
    const MenuOption = [
        {
            id:1,
            name:'Dashboard',
            path:'/dashboard',
            icon:PanelsTopLeft
        },
        {
            id:2,
            name:'Create New',
            path:'/dashboard/create-new',
            icon:FileVideo
        },

    ]

    const path = usePathname();
    console.log()


    return (
        <div className="w-64 h-screen shadow-md p-5">
            <div className="grid gap-2">
                {MenuOption.map((item, index) => (
                    <Link key={index} href={item.path}>                   
                    <div className={`flex items-center gap-2 p-3 hover:bg-primary hover:text-white rounded-md cursor-pointer ${path==item.path&&'bg-primary text-white'}`}>
                        <item.icon className="w-5 h-5" />
                        <h2>{item.name}</h2>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default SideNav