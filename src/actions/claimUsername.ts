"use server";

import Page from "@/models/Page.model.";
import { connect } from "mongoose";

export default async function claimUsername(
  prevState: any,
  formData: FormData
) {
  try {
    const username = formData.get("username")?.toString()?.trim();
    if (!username) return;

    await connect(process.env.MONGODB_URI!);
    await Page.create({ uri: username });

    return {
      redirect: true,
      redirectTo: `/account/${username}`,
      error: false,
    };
  } catch (error: any) {
    if (error.code === 11000) {
      return {
        redirect: true,
        redirectTo: "/account?usernameTaken=1",
        error: true,
      };
    }
  }
}
