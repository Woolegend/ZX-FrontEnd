import NextAuth from 'next-auth';

import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { clientPromise } from './lib/mongodb';
import Google from 'next-auth/providers/google';
import { authConfig } from './auth.config';

/**
 * Google only provides Refresh Token
 * to an application the first time a user signs in.
 *
 * To force Google to re-issue a Refresh Token,
 * the user needs to remove the application
 *
 * from their account and sign in again:
 * https://myaccount.google.com/permissions
 */

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    newUser: '/signup',
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
});
