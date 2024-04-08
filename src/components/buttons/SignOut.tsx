"use client";

import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

const SignOut: React.FC<{
  loadedBtnClassName?: string;
  textClassName?: string;
  btnSize?: string;
}> = ({
  loadedBtnClassName = "flex gap-2 items-center border py-2 px-4 shadow rounded-md",
  textClassName,
  btnSize,
}) => {
  return (
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
  );
};

export default SignOut;
