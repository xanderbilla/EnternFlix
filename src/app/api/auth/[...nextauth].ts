import bcrypt from 'bcryptjs'
import prismadb from '@/lib/prismadb' 
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {compare} from 'bcrypt'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: 'Email',
          type: 'text'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials){
        if (!credentials?.email || !credentials?.password){
          throw new Error("Email and Password required");
          
          const user = await prismadb.user.findUnique({
            where:{
              email: credentials.email
            }
          });

          if(!user || !user.hashedPassword){
            throw new Error("Email doesn't Exist");
          }

          await isCorrectPassword = await compare(
            credentials.password, hashedPassword
          );

          if(!isCorrectPassword){
            throw new Error("Incorrect password");
          }

          return user;

        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages:{
    signIn:"/auth"
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  jwt:{
    secret: process.env.JWT_SECRET
  },
  secret: process.env.NEXTAUTH_SECRET
});

//When we pass our username and password it will be POST and when we fetch the session it will be GET

export { handler as GET, handler as POST }