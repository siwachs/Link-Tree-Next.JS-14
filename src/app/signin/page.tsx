import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";
import { redirect } from "next/navigation";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function SigninPage() {
  // @ts-ignore
  const session = await getServerSession(authOption);
  if (session) redirect("/");

  return (
    <div>
      <div className="p-4 max-w-sm mx-auto">
        <h1 className="text-4xl font-bold text-center select-none mb-6">
          Sign In
        </h1>
        <p className="text-center mb-6 text-gray-500">
          Available Authentication Methods
        </p>

        <LoginWithGoogle />
      </div>
    </div>
  );
}
