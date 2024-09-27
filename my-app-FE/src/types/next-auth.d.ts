/* eslint-disable */
import NextAuth, { User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import {
  AdminBankOperatorsGet200ResponseOperatorsInnerAuthRole,
  AdminShopLoginPost200ResponseAuthRole,
} from '../generated/currencyApi/api';

// TODO: 型情報を定義する(ログインログアウトのAPIが固まってから)
// TODO: 永遠に放置されたTODO
declare module 'next-auth' {
  interface User {
    id: string;
    name?: string | null;
    // accessToken?: any;
    // accessTokenExpires?: any;
    // refreshToken?: any;
    // expiresIn?: any;
    // type?: any;
  }
  interface Session {
    user: User;
    // accessToken: any;
    // error: any;
    // expires: any;
    // type?: any;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    // accessToken: string;
    // error: string;
    user: {
      id: string;
      name?: string | null;
    };
  }
}
