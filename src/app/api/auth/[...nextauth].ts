import NextAuth, { Account, Profile, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { JWT } from "next-auth/jwt"

export default NextAuth ({
    providers: [
        
        GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
  
      }),
    
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
      },
      callbacks: {
        async jwt({
          token, 
          user,
          account,
          profile,
        }:{
          token: JWT;
          user?: User | undefined;
          account?: Account | null | undefined;
          profile?: Profile | undefined;
        }) {
          if(user){
            token.provider = account?.provider;
          }
          return token
        },
        async session({session, token}:{session: any, token: JWT,}){
          if(session.user){
            session.user.provider = token.provider;
          }
          return session;
        }
      }
})