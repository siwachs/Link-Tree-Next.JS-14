"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signIn } from "next-auth/react";

const LoginWithGoogle: React.FC = () => {
  return (
    <button
      onClick={() => signIn("google")}
      className="bg-white shadow w-full py-4 flex items-center justify-center gap-3"
    >
      <FontAwesomeIcon className="w-7 h-7" icon={faGoogle} />
      Sign In With Google
    </button>
  );
};

export default LoginWithGoogle;
