import fs from "fs"
import { NextResponse, NextRequest } from "next/server"
import path from "path"

function encodePath(p: string) {
    return p.split(path.sep).map(encodeURIComponent).join("/")
}

export async function POST(req: NextRequest){
    const { slug } = await req.json()

    const baseDir = path.join(process.cwd(), "src/app/realDelo/ErsteSeite")
    const filePath = path.join(baseDir, `${slug}.md`)

    let targetPath = filePath

    if (!fs.existsSync(filePath)) {
        const folderPath = path.join(baseDir, slug)
        if (fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory()) {
            targetPath = path.join(folderPath, "Readme.md")
        } else {
            return NextResponse.json({ message: `Slug '${slug}' not found` }, { status: 404 })
        }
    }

    if (!fs.existsSync(targetPath)) {
        return NextResponse.json({ message: `File for slug '${slug}' not found` }, { status: 404 })
    }

    const inhalt = fs.readFileSync(targetPath, "utf-8")

    const dirOfFile = path.dirname(targetPath)
    const processed = inhalt.replace(/!\[[^\]]*\]\((\.attachments[^)]+)\)/g, (_m, p1) => {
        const abs = path.join(dirOfFile, p1)
        const rel = path.relative(baseDir, abs)
        if (rel.startsWith("..")) return _m
        const encoded = encodePath(rel)
        return `![](/api/attachment?path=${encoded})`
    })

    return NextResponse.json({
        content: processed
    })
}