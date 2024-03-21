"use client";

import { useRef } from "react";

const CreateAccountForm: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);

  const createAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = usernameRef.current?.value.trim();
    if (!username) return;
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
