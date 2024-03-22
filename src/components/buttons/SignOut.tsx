"use client";

import { useState, useEffect } from "react";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

const SignOut: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted ? (
    <button
      type="button"
      className="flex gap-2 items-center border py-2 px-4 shadow"
      onClick={() => signOut()}
    >
      <span>Sign Out</span>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  ) : (
    <button
      type="button"
      className="flex gap-2 items-center border py-2 px-4 shadow animate-pulse bg-gray-200"
      onClick={() => signOut()}
    >
      <span>Sign Out</span>
      <span>...</span>
    </button>
  );
};

export default SignOut;
