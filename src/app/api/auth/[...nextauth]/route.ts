import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import NextAuth from "next-auth/next";
import prisma from "@/lib/prisma";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma), 
  providers: [
    GitHubProvider({
    clientId: process.env.GITHUB_ID ?? "",
    clientSecret: process.env.GITHUB_SECRET ?? ""
    })
  ]
}

export const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};