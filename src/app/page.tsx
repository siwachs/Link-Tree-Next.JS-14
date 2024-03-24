import { getServerSession } from "next-auth";
import { authOption } from "./api/auth/[...nextauth]/route";
import CreateAccountForm from "@/components/forms/CreateAccountForm";

export default async function Home() {
  // @ts-ignore
  const session = await getServerSession(authOption);

  return (
    <section className="pt-32">
      <div className="max-w-md mb-6">
        <h1 className="text-6xl font-bold">
          Your one link <br /> for everything
        </h1>
        <h2 className="text-gray-500 text-xl mt-6">
          Share your links, music, social profiles, contact information and more
          on one page
        </h2>
      </div>

      <CreateAccountForm user={session?.user} />
    </section>
  );
}
