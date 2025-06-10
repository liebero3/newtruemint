import ReactMarkdown from "react-markdown"
import { loadMarkdown } from "@/lib/markdown"

export default async function Body(){
    const content = loadMarkdown('Readme.md')
    return(
        <div className=" max-w-150 lg:max-w-200 justify-self-center text-2xl">
            <ReactMarkdown
                components={{
                    h2: (props) => (
                        <p className=" text-3xl text-justify my-5 font-bold" {...props} />
                    ),
                    h3: (props) => (
                        <p className=" text-[1.75rem] text-justify my-3 font-semibold" {...props} />
                    ),
                    p: (props) => (
                        <p className=" text-2xl text-justify" {...props} />
                    ),
                    ul: (props) => (
                        <ul className="list-disc pl-6 text-2xl" {...props} />
                    ),
                    li: (props) => (
                        <li className="text-2xl" {...props} />
                    ),
                }}>
                {content}
            </ReactMarkdown>
        </div>
    )
}
