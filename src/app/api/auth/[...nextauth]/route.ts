import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/app/libs/mongodb";
import GoogleAuthProvider from "next-auth/providers/google";

export const authOption = {
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleAuthProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};

// @ts-ignore
const authHandler = NextAuth(authOption);

export { authHandler as GET, authHandler as POST };
