"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const CreateAccountForm: React.FC<{ user: any }> = ({ user }) => {
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null);

  const createAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = usernameRef.current?.value.trim();
    if (!username) return;

    if (user) {
      router.push("/account");
    } else {
      signIn("google", { callbackUrl: `/account?desiredUsername=${username}` });
    }
  };

  return (
    <form
      onSubmit={createAccount}
      className="inline-flex flex-col items-center shadow-lg md:flex-row"
    >
      <div className="flex items-center">
        <span className="bg-white py-2 pl-4 md:py-4">linktree.to/</span>
        <input
          ref={usernameRef}
          placeholder="username"
          className="px-2 py-2 outline-none md:py-4"
          type="text"
        />
      </div>

      <button
        className="mt-2 w-full bg-blue-500 px-6 py-2 text-white md:mt-0 md:py-4"
        type="submit"
      >
        Join for Free
      </button>
    </form>
  );
};

export default CreateAccountForm;
