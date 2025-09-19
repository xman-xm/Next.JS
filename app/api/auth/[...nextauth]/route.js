import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter";
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth environment variables");
}

export const authOptions = {
   adapter: PrismaAdapter(prisma),
  providers: [
    
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ]
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
