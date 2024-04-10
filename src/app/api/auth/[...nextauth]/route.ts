import NextAuth from "next-auth";
import { authOption } from "@/app/libs/authOptions";

// @ts-ignore
const authHandler = NextAuth(authOption);

export { authHandler as GET, authHandler as POST };
