"use server";

import { authOption } from "@/app/libs/authOptions";
import connectToDatabase from "@/app/libs/mongoosedb";
import Page from "@/models/Page.model";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export default async function claimUsername(
  prevState: any,
  formData: FormData,
) {
  try {
    const username = formData.get("username")?.toString()?.trim();
    if (!username)
      return {
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

    revalidatePath("/account");

    return {
      error: false,
      errorMessage: "",
    };
  } catch (error: any) {
    if (error.code === 11000) {
      return {
        error: true,
        errorMessage: "Username already taken.",
      };
    }

    return {
      error: true,
      errorMessage: error.message,
    };
  }
}
