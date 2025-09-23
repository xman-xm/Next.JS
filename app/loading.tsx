import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SignInButton from "@/components/ui/signinButton";
import { Button } from "@/components/ui/button";
import { Skeleton } from '@/components/ui/skeleton';
import Link from "next/link";
export default function Loading() {
  // Add fallback UI that will be shown while the route is loading.
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
   
       <Card className=" md:w-[700px]  lg:w-[700px]  sm:w-full  m-4 "  >
        <CardHeader className=" font-medium text-2xl " >
          <div className="flex items-center space-x-4 pb-5 " >
    
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>


      
           
          </div>
             
             <CardTitle>   <Skeleton className="h-5 w-[250px]" />  </CardTitle>
          </CardHeader>
        <CardContent>
  <div className="space-y-2" >
      <Skeleton className="h-3 w-[300px]" />
       <Skeleton className="h-3 w-[250px]" />
        <Skeleton className="h-3 w-[200px]" />
  </div>
        </CardContent>
  
      </Card>
   
    </main>
  
  </>
  )
}