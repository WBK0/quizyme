import { connectToDB } from "@/utils/database";
import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { compare } from 'bcryptjs';

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

        console.log('login', user)

        return {
          email: user.email,
          id: user.id,
          isComplete: user.isComplete,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account } : { user: any, account: any }) {        
      try {
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
      console.log('session', session, token)

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          isComplete: token.isComplete
        },
      };
    },
    jwt: async ({ token, user, trigger } ) => {
      // console.log('jwt', token, user, trigger)

      if(trigger === 'update'){
        const dbUser = await prisma.user.findUnique({
          where: {
            id: token.id as string
          }
        });

        return{
          ...token,
          isComplete: dbUser?.isComplete
        }
      }

      if (user) {
        return {
          ...token,
          id: user.id,
          isComplete: user.isComplete
        };
      }
      
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }