"use server";

import { authOption } from "@/app/libs/authOptions";
import connectToDatabase from "@/app/libs/mongoosedb";
import Page from "@/models/Page.model";
import { getServerSession } from "next-auth";

export default async function claimUsername(
  prevState: any,
  formData: FormData,
) {
  try {
    const username = formData.get("username")?.toString()?.trim();
    if (!username)
      return {
        redirect: false,
        redirectTo: null,
        error: true,
        errorMessage: "Username is required.",
      };

    await connectToDatabase();

    // @ts-ignore
    const session = await getServerSession(authOption);
    await Page.create({
      uri: username,
      owner: session?.user?.email,
      displayName: session?.user?.name,
    });

    return {
      redirect: true,
      redirectTo: `/account?created=${username}`,
      error: false,
      errorMessage: "",
    };
  } catch (error: any) {
    if (error.code === 11000) {
      return {
        redirect: false,
        redirectTo: null,
        error: true,
        errorMessage: "Username already taken.",
      };
    }

    return {
      redirect: false,
      redirectTo: null,
      error: true,
      errorMessage: error.message,
    };
  }
}
