"use server";

export default async function savePage(prevState: any, formData: FormData) {
  try {
    const displayName = formData.get("displayName")?.toString()?.trim();
    if (!displayName) return;

    const location = formData.get("location")?.toString()?.trim();
    const bio = formData.get("bio")?.toString()?.trim();
  } catch (error: any) {}
}
