"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import React from "react";

const LoginWithGoogle: React.FC = () => {
  return (
    <button
      onClick={() => {}}
      className="bg-white shadow w-full py-4 flex items-center justify-center gap-3"
    >
      <FontAwesomeIcon className="w-7 h-7" icon={faGoogle} />
      Sign In With Google
    </button>
  );
};

export default LoginWithGoogle;
