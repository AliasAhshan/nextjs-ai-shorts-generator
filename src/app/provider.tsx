"use client"

import { Users } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { ReactNode, useEffect } from 'react';
import { db } from '@/configs/dbconfig';

type ProviderProps = {
  children: ReactNode;
};

function Provider({ children }: ProviderProps) {
  const { user } = useUser();

  useEffect(() => {
    const checkAndInsertUser = async () => {
      if (!user) return;

      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;

      const result = await db.select().from(Users).where(eq(Users.email, email));

      if (!result[0]) {
        await db.insert(Users).values({
          name: user.fullName ?? 'Unnamed User',
          email,
          imageUrl: user.imageUrl,
        });
      }
    };

    checkAndInsertUser();
  }, [user]);

  return <div>{children}</div>;
}

export default Provider;
