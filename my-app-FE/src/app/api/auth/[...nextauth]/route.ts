import NextAuth, { NextAuthOptions, SessionStrategy } from 'next-auth';
import { AxiosResponse } from "axios";
import CredentialsProvider from "next-auth/providers/credentials"
import { postLogin } from '@/adapter/currencyApi/swr/hooks/postLogin';
export const authOptions: NextAuthOptions = {    
    providers: [
        CredentialsProvider({
            type: 'credentials',
            id: 'credentials',
            name: 'credentials',
            credentials : {
                username: {
                    label: 'Username',
                    type: 'text',
                  },
                code: {
                    label: 'OTP',
                    type: 'text',
                  }
            },
            authorize :  async (credentials) => {
                const res: AxiosResponse<any> = await postLogin({user : credentials?.username, code: credentials?.code})
                    return {
                      id : res.data[0].id_user,
                      name : res.data[0].username,
                      // idToken: res.data.idToken,
                      // accessToken: res.data.accessToken,
                      // refreshToken: res.data.refreshToken,
                      // expiresIn: res.data.expiresIn,
                      // type: res.data.type
                    }
                    
            }
        })
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
            return{
            // ...token,
            // accessToken: user.accessToken,
            // accessTokenExpires: user.expiresIn,
            // refreshToken: user.refreshToken,
            // type: user.type,
              user:{
                id: user.id,
                name: user.name,
              }
            }
        }
        return token;
    },
        async session({ session, token }) {
          // session.accessToken = token.accessToken;
          // session.error = token.error;
          // session.type = token.type;
          session.user = token.user;
          return session;
        },
    },
    session : {
        strategy : 'jwt' as SessionStrategy,
        maxAge: 1 * 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn : '/login'
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
