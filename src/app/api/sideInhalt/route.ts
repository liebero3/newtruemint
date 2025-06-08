import fs from "fs"
import { NextResponse } from "next/server"
import path from "path"
//@ts-ignore
export async function POST(req){
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

    return NextResponse.json({
        content: inhalt
    })
}
