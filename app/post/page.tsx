'use client'
import { Button } from '@/components/ui/button'
import SignInButton from '@/components/ui/signinButton'
import { ArrowLeft, Eye, EyeOff, LogIn, Pen, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createPost,askGemini } from "./actions";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Markdown from '@/components/ui/markdown'
import { redirect } from 'next/dist/server/api-utils'
export default function Page() {
  const [view,setView]=useState(false)
   const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
      const [load,setLoad]=useState(false)
        const session = useSession();
  const router = useRouter();
const handleAI=async()=>{
  const res = await askGemini("Generate a detailed blog post about "+title+"In the markdown format with appropriate headings, subheadings,images,text styles like italic and bold and include tables  and bullet points.");
  setContent(res)
}
  return (
    <div className=' min-h-screen bg-background' >
      <header className={ `border-b  w-full ${session.status === "authenticated"?'':'fixed'}` } >
<div className="container mx-auto px-4 py-4 flex items-center justify-between " >

  <Button onClick={()=>{
   router.push('/')
  }}
  variant={'ghost'}
  >
<ArrowLeft></ArrowLeft>Back to home
  </Button>


</div>
      </header>
      {session.status === "authenticated" ?<>
          <main className=' container mx-auto px-4 py-8  ' >
<div className=' max-w-4xl mx-auto' >
<div className="flex items-center justify-between mb-8 ">
  <h1 className=' text-3xl font-bold ' >Create a new post</h1>
  <Button variant={'outline'} onClick={()=>{
    setView(!view)
  }} >

{view?<EyeOff />:<Eye></Eye>}
{view?'Hide Preview':' Show Preview'}
  </Button>
</div>
<div  className={`grid grid-cols-1    gap-8 ${view ? 'lg:grid-cols-2' : 'lg:grid-cols-1 '}`} >
<Card className=' inline-block' >
  <CardHeader>
    <CardTitle>Write a new post</CardTitle>
  </CardHeader>
  <CardContent>
   <form className=' space-y-6 ' action={async (formData) => {
     if (!session.data?.user?.name) return;
     setLoad(true);
     await createPost(formData, session.data.user.email!);
     setLoad(false);
   }} >
    <div className="space-y-2">
<Label htmlFor='name' 

>Name</Label>
<Input id='name' 
name='name'
value={title}
onChange={(e) => setTitle(e.target.value)}
placeholder='Post title'
/>
    </div>
    <div className="space-y-2">
<Label htmlFor='content' 

>Content</Label>
<Textarea id='content' 
rows={10}
name='content'
value={ content}
onChange={(e) => setContent(e.target.value)}
/>
<Button variant={'ghost'} className='font-light text-sm' onClick={(e)=>{
  e.preventDefault()
  handleAI()}} >
<Sparkles />Agent
</Button>
    </div>
 
<Button className='w-full flex justify-center items-center transition-all duration-300 ' disabled={load} >{!load ? 'Submit' :   <div className='flex space-x-2 justify-center items-center  h-screen dark:invert pl-2'>
 	<span className='sr-only'>Loading...</span>
  	<div className='h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div className='h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div className='h-2 w-2 bg-white rounded-full animate-bounce'></div>
</div>}

</Button>
   </form>
  </CardContent>

</Card>
{view&&(
<Card>
  <CardHeader>
    <CardTitle>{title}</CardTitle>
  </CardHeader>
  <CardContent>
  <Markdown content={content} />
  </CardContent>

</Card>
)}

</div>
</div>
      </main>
      </>:<>
      <div className='flex flex-col w-full justify-center items-center pt-8 space-y-4  h-screen ' >
<p className=' text-2xl font-mono' >
  Please consider joining in to create a post.
  
</p>
<Button   variant={'outline'} onClick={()=>signIn('google')} ><LogIn />LogIn</Button>
      </div>

      </>}
  
    </div>
  )
}
