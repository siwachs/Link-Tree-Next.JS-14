import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import ClaimUsernameForm from "@/components/forms/ClaimUsernameForm";
import Page from "@/models/Page.model";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import connectToDatabase from "@/app/libs/mongoosedb";

export default async function AccountPage(req: any) {
  // @ts-ignore
  const session = await getServerSession(authOption);

  const desiredUsername = req.searchParams?.desiredUsername?.trim();
  await connectToDatabase();
  const page = await Page.findOne({ owner: session?.user?.email });
  const plainPage = JSON.parse(JSON.stringify(page));

  return page && session ? (
    <>
      <PageSettingsForm page={plainPage} session={session} />
      <PageButtonsForm page={plainPage} />
      <PageLinksForm page={plainPage} />
    </>
  ) : (
    <ClaimUsernameForm desiredUsername={desiredUsername} />
  );
}
