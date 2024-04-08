import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/route";
import CreateAccountForm from "@/components/forms/CreateAccountForm";

export default async function Home() {
  // @ts-ignore
  const session = await getServerSession(authOption);

  return (
    <section className="pt-32">
      <div className="mb-6 max-w-md">
        <h1 className="text-3xl font-bold sm:text-6xl">
          Your one link <br /> for everything
        </h1>
        <h2 className="mt-6 text-lg text-gray-500 sm:text-xl">
          Share your links, music, social profiles, contact information and more
          on one page
        </h2>
      </div>

      <CreateAccountForm user={session?.user} />
    </section>
  );
}
