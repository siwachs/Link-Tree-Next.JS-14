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
      router.push(`/account?desiredUsername=${username}`);
    }

    signIn("google", { callbackUrl: `/account?desiredUsername=${username}` });
  };

  return (
    <form
      onSubmit={createAccount}
      className="inline-flex items-center shadow-lg"
    >
      <span className="bg-white py-4 pl-4">linktree.to/</span>
      <input
        ref={usernameRef}
        placeholder="username"
        className="py-4 px-2 outline-none"
        type="text"
      />
      <button className="bg-blue-500 text-white py-4 px-6" type="submit">
        Join for Free
      </button>
    </form>
  );
};

export default CreateAccountForm;
