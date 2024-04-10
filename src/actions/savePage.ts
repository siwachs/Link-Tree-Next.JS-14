"use server";

import Page from "@/models/Page.model";
import { getServerSession } from "next-auth";

// @ts-ignore
import { PageLink } from "../../global";
import connectToDatabase from "@/app/libs/mongoosedb";
import { authOption } from "@/app/libs/authOptions";

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

    await connectToDatabase();
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

    await connectToDatabase();
    const filteredButtons: any = {};
    formData.forEach((value, key) => {
      if (!key.startsWith("$")) {
        if (typeof value === "string") {
          const trimmedValue = value.trim();
          if (trimmedValue) {
            filteredButtons[key] = trimmedValue.toLocaleLowerCase();
          }
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

    await connectToDatabase();
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
