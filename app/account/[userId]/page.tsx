import React from 'react'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Heart } from 'lucide-react'

export default async function page({params}:{params:{userId: string}}) {
    const user  = await prisma.user.findUnique({
        where: { id: params.userId },
        include: { posts: true }
    })
    const posts = user?.posts
    if (user===null){
        return <div>User not found</div>
    }
 else return (
      <main className='mx-auto px-4 py-8 min-h-screen w-full flex  items-center flex-col' >
     
    
        
   <Card className='md:w-[700px]  lg:w-[700px]  sm:w-full  mb-4 p-4   '>
                

           <div className='flex space-x-4 ' >
                        <Avatar>
             {user?.image ? (
               <Image
                 src={user?.image.toString()}
                 alt={user?.name || 'User avatar'}
                 width={40}
                 height={40}
                 className="rounded-full object-cover"
               />
             ) : (
               <AvatarFallback>
                 {user?.name
                   ? user?.name.split(" ").map(n => n[0]).join("").toUpperCase()
                   : "?"}
               </AvatarFallback>
             )}

           </Avatar>
             <div>
                   
<p className="text-sm font-medium" >@{user.name}</p>
         <p className=' text-sm text-muted-foreground ml-2 ' >{new Date(user.createdAt).toLocaleDateString()}</p>
             </div>
              </div>
         

    </Card>
 <div>
       {posts?.map(post=>(
     <Card className=" md:w-[700px]  lg:w-[700px]  sm:w-full  m-4 " key={post.id} >
      <CardHeader className=" font-medium text-2xl " >
        <div className="flex items-center space-x-4 pb-5 " >
            
        <Avatar>
             {user?.image ? (
               <Image
                 src={user?.image.toString()}
                 alt={user?.name || 'User avatar'}
                 width={40}
                 height={40}
                 className="rounded-full object-cover"
               />
             ) : (
               <AvatarFallback>
                 {user?.name
                   ? user?.name.split(" ").map(n => n[0]).join("").toUpperCase()
                   : "?"}
               </AvatarFallback>
             )}

           </Avatar>
           <div className="flex flex-col space-x-2  ">
            <Link href={`/account/${user.id}`} className="hover:underline" >
<p className="text-sm font-medium" >@{user.name}</p>
            </Link>
     
      <p className="text-xs text-muted-foreground" >{new Date(post.createdAt).toLocaleDateString()}</p>
           </div>
         
        </div>
           
           <CardTitle> <Link className=" hover:underline"  href={`/posts/${post.id}`} > {post.title}</Link> </CardTitle>
        </CardHeader>
      <CardContent>
<p>{post.summery}</p>
      </CardContent>
      <CardFooter className=" border-t-1 flex  pt-2 space-x-4 items-center " >

      </CardFooter>
    </Card>
    ))}
   
 </div>
    </main>
    
  )
}