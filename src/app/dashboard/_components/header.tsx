import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react';

function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white p-3 px-5 flex items-center justify-between shadow-md">
      <div className="flex gap-3 items-center">
        <Image src={'/ailogo.png'} width={30} height={30} alt={'ailogo'} />
        <h2 className="font-bold text-xl">AI Shorts Generator</h2>
      </div>
      <div className="flex gap-3 items-center">
        <Button>Dashboard</Button>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
