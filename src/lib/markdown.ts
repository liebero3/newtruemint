import fs from 'fs'
import path from 'path'
import mime from 'mime-types'

export const baseDir = path.join(process.cwd(), 'src/app/realDelo/ErsteSeite')

function embedAttachment(abs: string){
  const data = fs.readFileSync(abs)
  const type = mime.lookup(abs) || 'application/octet-stream'
  const b64 = data.toString('base64')
  return `data:${type};base64,${b64}`
}

export function loadMarkdown(relativePath: string){
  const filePath = path.join(baseDir, relativePath)
  let text = fs.readFileSync(filePath, 'utf-8')
  const dirOfFile = path.dirname(filePath)
  text = text.replace(/!\[[^\]]*\]\((\.attachments[^)]+)\)/g, (_m,p1)=>{
    const abs = path.join(dirOfFile, decodeURIComponent(p1))
    const dataUrl = embedAttachment(abs)
    return `![](${dataUrl})`
  })
  return text
}

export function slugToRelative(slug: string): string | null {
  const filePath = path.join(baseDir, `${slug}.md`)
  if(fs.existsSync(filePath)) return `${slug}.md`
  const folderPath = path.join(baseDir, slug, 'Readme.md')
  if(fs.existsSync(folderPath)) return path.join(slug, 'Readme.md')
  return null
}
