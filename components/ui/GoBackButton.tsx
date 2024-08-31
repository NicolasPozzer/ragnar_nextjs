"use client"
import React from 'react'
import Link from "next/link";
import {useRouter} from "next/navigation";


export default function GoBackButton() {

    const router = useRouter()

    return (
        <button onClick={() => router.back()}
              className='bg-blue-400 w-full lg:w-auto text-xl px-2 py-1 text-center font-bold cursor-pointer'
        >Volver</button>
    )
}
