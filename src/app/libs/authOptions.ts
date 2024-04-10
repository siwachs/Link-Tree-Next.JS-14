import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/app/libs/mongodb";
import GoogleAuthProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOption: NextAuthOptions = {
  // @ts-ignore
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleAuthProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: { secret: process.env.NEXTAUTH_SECRET as string },
  secret: process.env.NEXTAUTH_SECRET as string,
};
