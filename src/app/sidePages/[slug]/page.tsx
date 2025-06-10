import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { articleIntro, fileMap, splitArticles } from "@/lib/sideFiles"
import { loadMarkdown, slugToRelative, baseDir } from "@/lib/markdown"
import fs from 'fs'
import path from 'path'
import { notFound } from "next/navigation"

export async function generateStaticParams(){
    const entries = fs.readdirSync(baseDir)
    return entries.filter(n => n !== 'Readme.md').map(n => ({ slug: n.replace(/\.md$/, '') }))
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SidePages({ params }: any){
    const relative = slugToRelative(params.slug)
    if(!relative) return notFound()
    const content = loadMarkdown(relative)

    const files = fileMap[params.slug]
    const news: string[] = []
    const archive: string[] = []
    if(files?.news){
        const n = loadMarkdown(path.join(params.slug, files.news))
        news.push(...splitArticles(n))
    }
    if(files?.archive){
        const a = loadMarkdown(path.join(params.slug, files.archive))
        archive.push(...splitArticles(a))
    }

    return (
        <div className="max-w-150 lg:max-w-200 mx-auto">
            <ReactMarkdown
                components={{
                    h2: (props) => (<p className="text-3xl text-justify my-5 font-bold" {...props} />),
                    h3: (props) => (<p className="text-[1.75rem] text-justify my-3 font-semibold" {...props} />),
                    p: (props) => (<p className="text-2xl text-justify" {...props} />),
                    img: (props) => (<img className="my-4" alt="" {...props} />),
                    ul: (props) => (<ul className="list-disc pl-6 text-2xl" {...props} />),
                    li: (props) => (<li className="text-2xl" {...props} />),
                }}>
                {content}
            </ReactMarkdown>

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
                                <Link href={`/sidePages/${params.slug}/news/${i}`} className="mt-2 inline-block underline">mehr</Link>
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
                                <Link href={`/sidePages/${params.slug}/archive/${i}`} className="mt-2 inline-block underline">mehr</Link>
                            </div>
                        )
                    })}
                </>
            )}

            <Link href="/">zurück</Link>
        </div>
    )
}
