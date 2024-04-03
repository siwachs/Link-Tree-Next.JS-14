"use server";

import { authOption } from "@/app/api/auth/[...nextauth]/route";
import Page from "@/models/Page.model.";
import { connect } from "mongoose";
import { getServerSession } from "next-auth";
import { PageLink } from "../../global";

export async function savePage(prevState: any, formData: FormData) {
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

    const dataKeys = ["location", "bio", "bgType", "bgColor"];
    const dataToUpdate: any = { displayName };
    for (const key of dataKeys) {
      if (formData.has(key)) {
        if (key === "location" || key === "bio") {
          dataToUpdate[key] = formData.get(key)?.toString()?.trim();
        } else {
          dataToUpdate[key] = formData.get(key);
        }
      }
    }

    await connect(process.env.MONGODB_URI!);
    await Page.updateOne({ owner: session?.user?.email }, dataToUpdate);

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

export async function savePageButtons(prevState: any, formData: FormData) {
  try {
    // @ts-ignore
    const session = await getServerSession(authOption);
    if (!session)
      return {
        error: true,
        errorMessage: "Session Expired or not available.",
      };

    await connect(process.env.MONGODB_URI!);
    const filteredButtons: any = {};
    formData.forEach((value, key) => {
      if (!key.startsWith("$")) {
        const trimmedValue = value?.toString()?.trim();
        if (trimmedValue) {
          filteredButtons[key] = trimmedValue.toLocaleLowerCase();
        }
      }
    });

    await Page.updateOne(
      { owner: session?.user?.email },
      { buttons: filteredButtons || {} },
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

export async function savePageLinks(links: PageLink[]) {
  try {
    // @ts-ignore
    const session = await getServerSession(authOption);
    if (!session)
      return {
        error: true,
        errorMessage: "Session Expired or not available.",
      };

    await connect(process.env.MONGODB_URI!);
    const filteredLinks = links
      .map((link) => ({
        ...link,
        title: link.title.trim(),
        subTitle: link.description.trim(),
        link: link.link.trim(),
      }))
      .filter((link) => link.title !== "" && link.link !== "");

    await Page.updateOne(
      { owner: session?.user?.email },
      { links: filteredLinks },
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
