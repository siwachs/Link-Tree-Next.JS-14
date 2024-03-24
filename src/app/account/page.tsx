import { redirect } from "next/navigation";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import ClaimUsernameForm from "@/components/forms/ClaimUsernameForm";
import Page from "@/models/Page.model.";

export default async function AccountPage(req: any) {
  // @ts-ignore
  const session = await getServerSession(authOption);
  if (!session) redirect("/");

  const desiredUsername = req.searchParams?.desiredUsername?.trim();
  const page = await Page.findOne({ owner: session?.user?.email });

  return page ? (
    <div>Page Found.</div>
  ) : (
    <div>
      <ClaimUsernameForm desiredUsername={desiredUsername} />
    </div>
  );
}
