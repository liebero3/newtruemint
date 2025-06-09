"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { fileMap, splitArticles } from "@/lib/sideFiles"

export default function ArchiveArticle(){
  const { slug, index } = useParams<{ slug: string; index: string }>()
  const [article,setArticle] = useState<string>()

  useEffect(()=>{
    async function load(){
      const file = fileMap[slug]?.archive
      if(!file) return
      const res = await fetch("/api/sideInhalt/",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({slug:`${slug}/${file.replace(/\.md$/,'')}`})
      })
      if(res.ok){
        const j = await res.json()
        const arts = splitArticles(j.content)
        const idx = parseInt(index,10)
        if(!isNaN(idx) && idx < arts.length){
          setArticle(arts[idx])
        }
      }
    }
    load()
  },[slug,index])

  return (
    <div className="max-w-150 lg:max-w-200 mx-auto">
      {article && <ReactMarkdown>{article}</ReactMarkdown>}
      <Link href={`/sidePages/${slug}`} className="underline mt-4 inline-block">zurück</Link>
    </div>
  )
}
