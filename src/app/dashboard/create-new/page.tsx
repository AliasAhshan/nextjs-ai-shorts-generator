"use client"

import React, { useState } from 'react';
import SelectTopic from './_components/selecttopic';
import SelectStyle from './_components/selectstyle';
import SelectDuration from './_components/selectduration';
import { Button } from '@/components/ui/button';

function CreateNew() {

    const [formData, setFormData] = useState<{ [key: string]: string}> ({});
    const onHandleInputChange=(fieldName: string, fieldValue: string) => {
        console.log(fieldName, fieldValue)

        setFormData(prev=>({
            ...prev,
            [fieldName]:fieldValue
        }))

    }

    return (
        <div className="md:px-20">
            <h2 className="font-bold text 4xl text-primary text-center">Create New</h2>

            <div className="mt-10 shadow-md p-10">
                {/* Select Topic */}
                <SelectTopic onUserSelect={onHandleInputChange}/>
                {/* Select Style */}
                <SelectStyle onUserSelect={onHandleInputChange}/>

                {/* Duration Component */}
                <SelectDuration onUserSelect={onHandleInputChange}/>
                {/* Create Button */}
                <Button className="mt-10 w-full">Create Short Video</Button>
            </div>
        </div>
    )
}

export default CreateNew