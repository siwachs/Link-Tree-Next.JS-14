import { redirect } from "next/navigation";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import ClaimUsernameForm from "@/components/forms/ClaimUsernameForm";

export default async function AccountPage(req: any) {
  // @ts-ignore
  const session = await getServerSession(authOption);

  if (!session) redirect("/");
  const desiredUsername = req.searchParams?.desiredUsername;

  return (
    <div>
      <ClaimUsernameForm desiredUsername={desiredUsername} />
    </div>
  );
}
