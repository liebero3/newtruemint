
import fs from "fs"
import { NextResponse } from "next/server"
import path from "path"

function encodePath(p: string) {
    return p.split(path.sep).map(encodeURIComponent).join("/")
}

export async function GET(){
    const baseDir = path.join(process.cwd(), 'src/app/realDelo/ErsteSeite')
    const pfad = path.join(baseDir, 'Readme.md')
    const rohInhalt = fs.readFileSync(pfad,"utf-8")

    const dirOfFile = path.dirname(pfad)
    const processed = rohInhalt.replace(/!\[[^\]]*\]\((\.attachments[^)]+)\)/g, (_m, p1) => {
        const abs = path.join(dirOfFile, p1)
        const rel = path.relative(baseDir, abs)
        if (rel.startsWith("..")) return _m
        const encoded = encodePath(rel)
        return `![](/api/attachment?path=${encoded})`
    })

    return NextResponse.json({
        props:{ fileInhalt : processed }
    })
}
