"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"

export default function sidePages(){
    const [inhalt,setInhalt] = useState<string>()
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
            <div className=" max-w-150 lg:max-w-200 justify-self-center text-2xl">
                {inhalt && (
                    <ReactMarkdown
                        components={{
                            h2:({node,...props})=> <p className=" text-3xl text-justify my-5 font-bold" {...props}/>,
                            p:({node,...props})=> <p className=" text-2xl text-justify" {...props}/>,
                            img:({node,...props})=> <img className="my-4" {...props}/>
                        }}>
                        {inhalt}
                    </ReactMarkdown>
                )}
                <Link href={"/"}>zurück</Link>
            </div>
        </>
    )
}