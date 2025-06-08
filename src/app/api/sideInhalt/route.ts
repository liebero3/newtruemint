import fs from "fs"
import { NextResponse } from "next/server"
import path from "path"
//@ts-ignore
export async function POST(req){
    const { slug } = await req.json()
    //console.log(slug)
    const pfad = path.join(process.cwd(),`/src/app/realDelo/ErsteSeite/${slug}.md`)
    console.log(pfad)
    const inhalt = fs.readFileSync(pfad,"utf-8")
   //console.log(inhalt)
    return NextResponse.json({
        content:inhalt
    })
}
