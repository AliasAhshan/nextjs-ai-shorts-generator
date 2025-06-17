import React from 'react'
import Image from 'next/image'
import {
  AlertDialog,
  AlertDialogContent,
} from "@/components/ui/alert-dialog"

function CustomLoading({loading}) {
    return (
    <AlertDialog open={loading}>
    <AlertDialogContent className="bg-white">
        <div className="bg-white flex flex-col items-center my-10 justify-center">
            <Image src={"/loading.gif"} width={100} height = {100} alt="Loading animation"/>
            <h2>Generating your video...Do not refresh!!!</h2>
        </div>
    </AlertDialogContent>
    </AlertDialog>
    )
}

export default CustomLoading