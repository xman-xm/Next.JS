import React from 'react'
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
interface markdownProps{
    content:string
}
export default function Markdown({content}:markdownProps) {
  return (
    <>
    
<ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={
            {
                h1: ({node, ...props}) => <h1 className=' text-3xl font-bold my-2 ' {...props} />,
                h2: ({node, ...props}) => <h2 className=' text-2xl font-bold my-2 ' {...props} />,
                h3: ({node, ...props}) => <h3 className=' text-xl font-bold my-2 ' {...props} />,
                p: ({node, ...props}) => <p className=' my-2  ' {...props} />,
                a: ({node, ...props}) => <a className=' text-blue-500 underline ' {...props} />,
                li: ({node, ...props}) => <li className=' ml-4 list-disc ' {...props} />,
                code: ({node, ...props}) => <code className=' bg-muted px-1 py-0.5 rounded-md font-mono text-sm ' {...props} />,
                pre: ({node, ...props}) => <pre className=' bg-muted p-4 rounded-md my-2 overflow-x-auto ' {...props} />,
                blockquote: ({node, ...props}) => <blockquote className=' border-l-4 border-primary pl-4 italic my-2 text-muted-foreground ' {...props} />,
                table: ({node, ...props}) => <table className=' w-full my-2 border-collapse ' {...props} />,
                th: ({node, ...props}) => <th className=' border p-2 bg-muted font-bold ' {...props} />,
                td: ({node, ...props}) => <td className=' border p-2 ' {...props} />,
                ul: ({node, ...props}) => <ul className=' my-2 ml-4 list-disc ' {...props} />,
                ol: ({node, ...props}) => <ol className=' my-2 ml-4 list-decimal ' {...props} />,
                img: ({node, ...props}) => <img className=' my-2  rounded-sm' draggable={false} alt={props.alt} src={props.src} />,
            }
        }      >
        {content}
      </ReactMarkdown>
    </>
  
  )
}
