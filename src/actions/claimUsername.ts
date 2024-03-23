"use server";

import Page from "@/models/Page.model.";
import { connect } from "mongoose";

export default async function claimUsername(formData: any) {
  try {
    const username = formData.get("username");
    await connect(process.env.MONGODB_URI!);
    return await Page.create({ uri: username });
  } catch (error) {}
}
