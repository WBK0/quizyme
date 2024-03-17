import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string, 
      isComplete: boolean,
      email: string
      emailVerified: Date
    } & DefaultSession["user"]
  }

  interface User {
    isComplete?: boolean,
    username?: string
    emailVerified?: Date
  }
}