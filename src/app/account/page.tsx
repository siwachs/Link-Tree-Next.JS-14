import { redirect } from "next/navigation";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function AccountPage(req: any) {
  // @ts-ignore
  const session = await getServerSession(authOption);

  if (!session) redirect("/");

  return (
    <div>
      <form>
        <h1 className="text-4xl font-bold text-center select-none mb-6">
          Grab your username
        </h1>

        <div className="max-w-sm mx-auto">
          <input
            defaultValue={req.searchParams?.desiredUsername}
            className="block p-2 outline-none mx-auto border w-full mb-2 text-center"
            type="text"
            placeholder="Username"
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 block mx-auto w-full"
            type="submit"
          >
            Claim this username
          </button>
        </div>
      </form>
    </div>
  );
}
