"use server";

import { authOption } from "@/app/api/auth/[...nextauth]/route";
import Page from "@/models/Page.model.";
import { connect } from "mongoose";
import { getServerSession } from "next-auth";

export default async function claimUsername(
  prevState: any,
  formData: FormData,
) {
  try {
    const username = formData.get("username")?.toString()?.trim();
    if (!username) return;

    await connect(process.env.MONGODB_URI!);

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
    };
  } catch (error: any) {
    if (error.code === 11000) {
      return {
        redirect: false,
        redirectTo: null,
        error: true,
      };
    }
  }
}
