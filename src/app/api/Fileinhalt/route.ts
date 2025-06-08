
import fs from "fs" 
import { NextResponse } from "next/server"
import path from "path"

export async function GET(){
    const pfad = path.join(process.cwd(), 'src/app/realDelo/ErsteSeite/Readme.md')
    const rohInhalt = fs.readFileSync(pfad,"utf-8")
    return NextResponse.json({
        props:{ fileInhalt : rohInhalt }
    })
}
