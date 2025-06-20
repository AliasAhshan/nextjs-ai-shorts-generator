"use client"

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import EmptyState from './_components/emptystate';
import Link from 'next/link';
import { db } from '@/configs/dbconfig';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { VideoData } from '@/configs/schema';
import VideoList from './_components/videolist';

function Dashboard() {

    const [videoList, setVideoList] = useState<typeof VideoData.$inferSelect[]>([]);
    const [loading, setLoading] = useState(true);
    const {user} = useUser();


    useEffect(() => {
        user&&GetVideoList();

    }, [user])

    const GetVideoList = async () => {
        setLoading(true)
        if(!user?.primaryEmailAddress?.emailAddress) return;

        const res = await db.select().from (VideoData)
        .where(eq(VideoData?.createdBy, user?.primaryEmailAddress?.emailAddress ));

        console.log(res);
        setVideoList(res);
        setLoading(false);
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-2xl text-primary">Dashboard</h2>
                <Link href={'/dashboard/create-new'}>
                <Button>+ Create New</Button>
                </Link>
            </div>

            {/* Emptry State */}
            {!loading && videoList.length === 0 && (
            <div>
                <EmptyState />
            </div>
            )}



            {/* {List of Videos} */}
            <VideoList videoList={videoList}/>



        </div>
        
    )
}

export default Dashboard