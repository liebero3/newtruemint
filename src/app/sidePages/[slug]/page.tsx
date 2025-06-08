"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function sidePages(){
    const [inhalt,setInhalt] = useState()
    const { slug } = useParams()
    useEffect(()=>{
        async function posten(){
            const rohDaten = await fetch("/api/sideInhalt/",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    slug: slug
                })
            })

            //@ts-ignore
            if(!rohDaten.ok){
                console.error("Fehler!", rohDaten)
                //@ts-ignore
                setInhalt(`Error:${rohDaten.status}`)
                return
            }

            const realInhalt = await rohDaten.json()
            //@ts-ignore
            setInhalt(realInhalt.content)
        }
        posten()
    },[slug])
    return(
        <>
            <div>
                {inhalt}
                <Link href={"/"}>zurück</Link>
            </div>
        </>
    )
}