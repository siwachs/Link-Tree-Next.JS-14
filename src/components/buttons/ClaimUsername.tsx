"use client";

import { useFormStatus } from "react-dom";
import RightIcons from "../icons/RightIcons";

const ClaimUsername: React.FC = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      aria-disabled={pending}
      className="bg-blue-500 text-white py-2 px-4 mx-auto w-full flex gap-2 items-center justify-center disabled:bg-blue-200"
    >
      <span>Claim this username</span>
      <RightIcons />
    </button>
  );
};

export default ClaimUsername;
