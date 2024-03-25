"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signIn } from "next-auth/react";

const LoginWithGoogle: React.FC = () => {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/account" })}
      className="flex w-full items-center justify-center gap-3 bg-white py-4 shadow"
    >
      <FontAwesomeIcon className="h-7 w-7" icon={faGoogle} />
      Sign In With Google
    </button>
  );
};

export default LoginWithGoogle;
