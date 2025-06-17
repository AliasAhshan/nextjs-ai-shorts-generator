import React from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SelectDurationProps = {
    onUserSelect: (key: string, value: string) => void;
}

function SelectDuration({onUserSelect}: SelectDurationProps) {
  return (
    <div className="mt-7">
        <h2 className="font-bold text-2xl text-primary">Duuration</h2>
        <p className="text-gray-500">Select the duration of your video</p>
        <Select onValueChange={(value)=>{
            if (value !== "Custom Prompt") {
                onUserSelect("duration", value)
            }

        }}>
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
            <SelectValue placeholder="Select Duration" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="30 Seconds">30 Seconds</SelectItem>   
            <SelectItem value="60 Seconds">60 Seconds</SelectItem>   
        </SelectContent>
        </Select>
    </div>
  )
}

export default SelectDuration