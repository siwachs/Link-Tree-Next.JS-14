"use client";

import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

const Logout: React.FC = () => {
  return (
    <button
      type="button"
      className="flex gap-2 items-center border py-2 px-4 shadow"
      onClick={() => signOut()}
    >
      <span>Sign Out</span>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );
};

export default Logout;
