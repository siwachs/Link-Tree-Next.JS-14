"use server";

import Page from "@/models/Page.model.";
import { redirect } from "next/navigation";
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
    redirect(`/account/${username}`);
  } catch (error: any) {
    if (error.code === 11000) {
      redirect("/account?usernameTaken=1");
    }
  }
}
