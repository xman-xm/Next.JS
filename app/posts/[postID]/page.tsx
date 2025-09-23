'use server'
import React from 'react'
import { prisma } from '@/lib/prisma'
import Markdown from '@/components/ui/markdown';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Page({ params }: { params: { postID: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: params.postID },
    include: { author: true, Commnts: true, Likes: true },
  });

  if (!post) {
    return <div className="text-center mt-10">Post not found.</div>;
  }

  return (
    <div className='min-h-screen bg-background' >
             <header className={ `border-b  w-full ` } >
<div className="container mx-auto px-4 py-4 flex items-center justify-between " >
<Link href='/' className='flex items-center space-x-2'>

<ArrowLeft></ArrowLeft>Back to home

</Link>

</div>
      </header>
      <main className='container mx-auto px-4 py-8 min-h-screen w-full flex  justify-center' >
     
     <div>
   <Card className='md:w-[700px]  lg:w-[700px]  sm:w-full  mb-4 p-4   '>
                

           <div className='flex space-x-4 ' >
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
             <div>
                       <Link href={`/account/${post.author.id}`} className="hover:underline" >
<p className="text-sm font-medium" >@{post.author.name}</p>
            </Link><p className=' text-sm text-muted-foreground ml-2 ' >{new Date(post.createdAt).toLocaleDateString()}</p>
             </div>
              </div>
        </Card>
             
        <Card className=' md:w-[700px]  lg:w-[700px]  sm:w-full  p-4 ' >
   
        <CardContent>
         <Markdown content={post.body || ''}></Markdown>
        </CardContent>
        
        </Card>
        </div>
      </main>
    </div>
  );
}
