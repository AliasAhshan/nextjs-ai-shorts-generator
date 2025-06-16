import React, {ReactNode} from 'react';
import Header from './_components/header';
import SideNav from './_components/sidenav';


type Props =  {
    children: ReactNode;
};

function DashboardLayout({children}: Props) {
    return (
        <div>
            <div className="hidden md:block h-screen bg-white fixed mt-[65px] w-64">
                <SideNav/>
            </div>
            <div>
                <Header/>
                <div className="md:ml-64 p-10">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout