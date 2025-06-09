"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { articleIntro, fileMap, splitArticles } from "@/lib/sideFiles"

export default function SidePages(){
    const [inhalt,setInhalt] = useState<string>()
    const [news,setNews] = useState<string[]>([])
    const [archive,setArchive] = useState<string[]>([])
    const { slug } = useParams<{ slug: string }>()


export default function sidePages(){
    const [inhalt,setInhalt] = useState<string>()
    const { slug } = useParams()

    useEffect(()=>{
        async function laden(){
            const baseRes = await fetch("/api/sideInhalt/",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({slug})
            })
            if(baseRes.ok){
                const json = await baseRes.json()
                setInhalt(json.content)
            } else {
                setInhalt(`Error:${baseRes.status}`)
            }

            const files = fileMap[slug as string]
            if(files?.news){
                const res = await fetch("/api/sideInhalt/",{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify({slug:`${slug}/${files.news.replace(/\.md$/,"")}`})
                })
                if(res.ok){
                    const j = await res.json()
                    setNews(splitArticles(j.content))
                }
            }
            if(files?.archive){
                const res = await fetch("/api/sideInhalt/",{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify({slug:`${slug}/${files.archive.replace(/\.md$/,"")}`})
                })
                if(res.ok){
                    const j = await res.json()
                    setArchive(splitArticles(j.content))
                }
            }
        }
        laden()
    },[slug])

    return(
        <>
            <div className="max-w-150 lg:max-w-200 mx-auto">
                {inhalt && (
                    <ReactMarkdown className="mb-10">{inhalt}</ReactMarkdown>
                )}

                {news.length > 0 && (
                    <>
                        <h2 className="text-3xl font-bold mb-4">Aktuelles</h2>
                        {news.map((art,i)=>{
                            const { heading, snippet, image } = articleIntro(art)
                            return (
                                <div key={i} className="border rounded-md shadow p-4 mb-4">
                                    <ReactMarkdown>{`## ${heading}`}</ReactMarkdown>
                                    {image && <img src={image} className="my-2 max-h-60" alt="" />}
                                    <p>{snippet}...</p>
                                    <Link href={`/sidePages/${slug}/news/${i}`} className="mt-2 inline-block underline">mehr</Link>
                                </div>
                            )
                        })}
                    </>
                )}

                {archive.length > 0 && (
                    <>
                        <h2 className="text-3xl font-bold my-4">Archiv</h2>
                        {archive.map((art,i)=>{
                            const { heading, snippet, image } = articleIntro(art)
                            return (
                                <div key={i} className="border rounded-md shadow p-4 mb-4">
                                    <ReactMarkdown>{`## ${heading}`}</ReactMarkdown>
                                    {image && <img src={image} className="my-2 max-h-60" alt="" />}
                                    <p>{snippet}...</p>
                                    <Link href={`/sidePages/${slug}/archive/${i}`} className="mt-2 inline-block underline">mehr</Link>
                                </div>
                            )
                        })}
                    </>
                )}

                <Link href="/">zurück</Link>
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