"use client"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"

export default function Body(){
    const [fileInhalt,setFileInhalt] = useState()
    useEffect(()=>{
        async function fetchen(){
            const rohDaten = await fetch("/api/Fileinhalt")
            const jsonDaten = await rohDaten.json() 
            setFileInhalt(jsonDaten.props.fileInhalt)
        }
        fetchen()
    },[])
    return(
        <>
            <div className=" max-w-150 lg:max-w-200 justify-self-center text-2xl">
                <ReactMarkdown
                    components={{
                        h2: (props) => <p className=" text-3xl text-justify my-5 font-bold" {...props} />,
                        p: (props) => <p className=" text-2xl text-justify" {...props} />,
                        ul: (props) => <ul className="list-disc pl-6 text-2xl" {...props} />, 
                        li: (props) => <li className="text-2xl" {...props} />,
                    }}>
                    {fileInhalt}
                </ReactMarkdown>
            </div>
        </>
    )
}
