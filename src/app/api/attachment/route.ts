import fs from "fs"
import path from "path"
import { NextResponse, NextRequest } from "next/server"
import mime from "mime-types"

export async function GET(req: NextRequest){
    const { searchParams } = new URL(req.url)
    const relPath = searchParams.get('path')
    if(!relPath){
        return NextResponse.json({error: 'No path provided'}, {status: 400})
    }
    const baseDir = path.join(process.cwd(), 'src/app/realDelo/ErsteSeite')
    const filePath = path.join(baseDir, relPath)
    if(!filePath.startsWith(baseDir)){
        return NextResponse.json({error: 'Invalid path'}, {status: 400})
    }
    if(!fs.existsSync(filePath)){
        return NextResponse.json({error: 'File not found'}, {status: 404})
    }
    const data = fs.readFileSync(filePath)
    const type = mime.lookup(filePath) || 'application/octet-stream'
    return new NextResponse(data, {
        headers: { 'Content-Type': type }
    })
}
