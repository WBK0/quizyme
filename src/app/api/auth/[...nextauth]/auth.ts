import { compare } from 'bcryptjs';
import sendEmail from "../signup/sendEmail";
import generateCode from "../signup/generateCode";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { connectToDB } from "@/utils/database";
import { AuthOptions } from "next-auth"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions : AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) { 
        await connectToDB();

        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if(!user?.password){
          throw new Error("This account is not registered with a credential provider and cannot be used to sign in with credentials.");
        }

        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        return {
          email: user.email,
          id: user.id,
          isComplete: user.isComplete,
          username: user?.username || undefined,
          image: user?.image || undefined,
          name: user?.name || undefined,
          emailVerified: user?.emailVerified || undefined
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    })
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/login", 
    newUser: "/auth/complete-register",
  },
  callbacks: {
    async signIn({ user, account } : { user: any, account: any }) {  
      try {
        if(!user.email && account.provider === 'github'){
          throw new Error("Email is required to sign in. Set up your email in your github profile to public and try again.");
        }

        const accountData = await prisma.account.findFirst({
          where: {
            user: {
              email: user.email,
            },
          },
        });

        if(accountData && account.provider !== accountData.provider){
          throw new Error("Account with this email is register with another provider.");
        }
      return true;
      } catch (error : unknown) {
        throw new Error((error as Error).message);
      }
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          isComplete: token.isComplete,
          emailVerified: token.emailVerified
        },
      };
    },
    jwt: async ({ token, user, trigger } ) => {
      if(trigger === 'update'){
        const dbUser = await prisma.user.findUnique({
          where: {
            id: token.id as string
          }
        });

        return{
          ...token,
          isComplete: dbUser?.isComplete,
          username: dbUser?.username,
          image: dbUser?.image,
          name: dbUser?.name,
          emailVerified: dbUser?.emailVerified
        }
      }

      if (user) {
        return {
          ...token,
          id: user.id,
          username: user.username,
          isComplete: user.isComplete,
          emailVerified: user.emailVerified
        };
      }
      
      return token;
    },
  },
  events: {
    linkAccount: async ({ user }) => {
      if(!user.email){
        return;
      }

      let code: string;
      let isCode;

      do {
        code = generateCode();
        isCode = await prisma.confirmCode.findUnique({
          where: {
            code: code,
          },
        });
      } while (isCode !== null);

      await prisma.confirmCode.create({
        data: {
          code,
          userId: user.id,
          deleteAt: new Date(Date.now() + 1000 * 60 * 15),
        },
      });
      
      await sendEmail(user?.email, code)

      return;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
}