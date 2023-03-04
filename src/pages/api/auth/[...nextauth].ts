import NextAuth, { type AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error('❌ Missing GITHUB_ID or GITHUB_SECRET in NextAuth config');
}

const options: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
};

export default NextAuth(options);
