"use server";

import { authOption } from "@/app/api/auth/[...nextauth]/route";
import Page from "@/models/Page.model.";
import { connect } from "mongoose";
import { getServerSession } from "next-auth";

export default async function savePage(prevState: any, formData: FormData) {
  try {
    const displayName = formData.get("displayName")?.toString()?.trim();
    if (!displayName)
      return {
        error: true,
        errorMessage: "Display name is required.",
      };

    // @ts-ignore
    const session = await getServerSession(authOption);
    if (!session)
      return {
        error: true,
        errorMessage: "Session Expired or not available.",
      };

    const location = formData.get("location")?.toString()?.trim();
    const bio = formData.get("bio")?.toString()?.trim();
    const bgType = formData.get("bgType");
    const bgColor = formData.get("bgColor");
    await connect(process.env.MONGODB_URI!);

    await Page.updateOne(
      { owner: session?.user?.email },
      {
        displayName,
        location,
        bio,
        bgType,
        bgColor,
      },
    );

    return {
      error: false,
      errorMessage: "",
    };
  } catch (error: any) {
    return {
      error: true,
      errorMessage: error.message,
    };
  }
}
