import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { fileMap, splitArticles } from "@/lib/sideFiles"
import { loadMarkdown } from "@/lib/markdown"
import { notFound } from "next/navigation"

export async function generateStaticParams(){
  const params: {slug:string,index:string}[] = []
  for(const slug of Object.keys(fileMap)){
    const file = fileMap[slug]?.news
    if(!file) continue
    const content = loadMarkdown(`${slug}/${file}`)
    const arts = splitArticles(content)
    arts.forEach((_,i)=>params.push({slug,index:i.toString()}))
  }
  return params
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function NewsArticle({ params }: any){
  const file = fileMap[params.slug]?.news
  if(!file) return notFound()
  const content = loadMarkdown(`${params.slug}/${file}`)
  const arts = splitArticles(content)
  const idx = parseInt(params.index,10)
  if(isNaN(idx) || idx >= arts.length) return notFound()
  const article = arts[idx]
  return (
    <div className="max-w-150 lg:max-w-200 mx-auto">
      <ReactMarkdown
        components={{
          h3: (props) => (
            <p className="text-[1.75rem] text-justify my-3 font-semibold" {...props} />
          ),
          ul: (props) => <ul className="list-disc pl-6 text-2xl" {...props} />,
          li: (props) => <li className="text-2xl" {...props} />,
        }}
      >
        {article}
      </ReactMarkdown>
      <Link href={`/sidePages/${params.slug}`} className="underline mt-4 inline-block">zurück</Link>
    </div>
  )
}
