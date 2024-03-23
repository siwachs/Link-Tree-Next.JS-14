import { redirect } from "next/navigation";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import RightIcons from "@/components/icons/RightIcons";
import claimUsername from "@/actions/claimUsername";

export default async function AccountPage(req: any) {
  // @ts-ignore
  const session = await getServerSession(authOption);

  if (!session) redirect("/");

  return (
    <div>
      <form action={claimUsername}>
        <h1 className="text-4xl font-bold text-center select-none mb-6">
          Grab your username
        </h1>

        <div className="max-w-sm mx-auto">
          <input
            name="username"
            defaultValue={req.searchParams?.desiredUsername}
            className="block p-2 outline-none mx-auto border w-full mb-2 text-center"
            type="text"
            placeholder="Username"
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 mx-auto w-full flex gap-2 items-center justify-center"
            type="submit"
          >
            <span>Claim this username</span>
            <RightIcons />
          </button>
        </div>
      </form>
    </div>
  );
}
