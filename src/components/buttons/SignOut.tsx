"use client";

import { useState, useEffect } from "react";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

const SignOut: React.FC<{
  loadedBtnClassName?: string;
  loadingBtnClassName?: string;
  textClassName?: string;
  btnSize?: string;
}> = ({
  loadedBtnClassName = "flex gap-2 items-center border py-2 px-4 shadow",
  loadingBtnClassName = "flex gap-2 items-center border py-2 px-4 shadow animate-pulse bg-gray-200",
  textClassName,
  btnSize,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted ? (
    <button
      type="button"
      className={loadedBtnClassName}
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <span className={textClassName}>Sign Out</span>
      <FontAwesomeIcon
        fixedWidth
        icon={faRightFromBracket}
        className={btnSize}
      />
    </button>
  ) : (
    <button type="button" className={loadingBtnClassName} onClick={() => {}}>
      <span className={textClassName}>Sign Out ...</span>
    </button>
  );
};

export default SignOut;
