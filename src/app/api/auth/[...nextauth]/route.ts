import NextAuth from "next-auth";
import GoogleAuthProvider from "next-auth/providers/google";

export const authOption = {
  providers: [
    GoogleAuthProvider({
      clientId: "",
      clientSecret: "",
    }),
  ],
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
