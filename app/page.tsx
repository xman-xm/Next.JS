import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Markdown from "@/components/ui/markdown";
import SignInButton from "@/components/ui/signinButton";

import { prisma } from "@/lib/prisma";
import { PlusCircle, LogIn,Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default async function Home() {
   const posts= await prisma.post.findMany({
        include: { author: true 
          ,Commnts:true,
          Likes:true
        }
   })
  console.log("Posts fetched:", posts.length); // Check Vercel logs
   const isAuth=false
   const likeLoads=false
   const liked=false

  return (
   
  <>

 
  <header className="border-b  " >
    <div className="container mx-auto px-4 py-4 flex items-center  justify-between ">
      <Link href="/"><img src="/logo.png" alt=""  className=" size-10 w-24" /></Link>
      <div className="min-h-full flex items-center justify-center space-x-4" >
   <SignInButton></SignInButton>
    
      </div>
    </div>
  </header>
  <main className="container mx-auto px-4 py-8">
<div className="flex flex-col items-center justify-center" >
  <h1 className="text-4xl  mb-4  font-bold  ">Learning next.js</h1>
  <p className="text-lg mb-8 text-center ">Discover amazing content and share your thoughts with the world.</p>
</div>
  </main>
  <main className="flex flex-col justify-center items-center flex-1 " >
    {posts.map(post=>(
     <Card className=" md:w-[700px]  lg:w-[700px]  sm:w-full  m-4 " key={post.id} >
      <CardHeader className=" font-medium text-2xl " >
        <div className="flex items-center space-x-4 pb-5 " >
            
        <Avatar>
             {post?.author?.image ? (
               <Image
                 src={post?.author?.image.toString()}
                 alt={post?.author?.name || 'User avatar'}
                 width={40}
                 height={40}
                 className="rounded-full object-cover"
               />
             ) : (
               <AvatarFallback>
                 {post?.author?.name
                   ? post?.author?.name.split(" ").map(n => n[0]).join("").toUpperCase()
                   : "?"}
               </AvatarFallback>
             )}

           </Avatar>
           <div className="flex flex-col space-x-2 ">
     <p className="text-sm font-medium" >@{post.author.name}</p>
      <p className="text-xs text-muted-foreground" >{new Date(post.createdAt).toLocaleDateString()}</p>
           </div>
         
        </div>
           
           <CardTitle> <Link className=" hover:underline"  href={`/posts/${post.id}`} > {post.title}</Link> </CardTitle>
        </CardHeader>
      <CardContent>
<p>{post.summery}</p>
      </CardContent>
      <CardFooter className=" border-t-1 flex  pt-2 space-x-4 items-center " >
<Button variant={'ghost'} size={'lg'} className="flex  items-center space-x-1 cursor-pointer " ><Heart className={`h-10 w-10 ${likeLoads?'animate-pulse':liked?' fill-red-500 text-red-500':''} `}  /><span>{post.Likes.length}</span></Button>

      </CardFooter>
    </Card>
    ))}
   
  </main>

  </>
  );
}
