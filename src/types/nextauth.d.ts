import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string, 
      isComplete: boolean,
      email: string
    } & DefaultSession["user"]
  }

  interface Adapter{
    isComplate: boolean;
  }
}