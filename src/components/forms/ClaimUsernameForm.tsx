"use client";

import claimUsername from "@/actions/claimUsername";
import { useFormState } from "react-dom";
import RightIcons from "../icons/RightIcons";

const ClaimUsernameForm: React.FC<{ desiredUsername: string }> = ({
  desiredUsername,
}) => {
  const initialState = {
    username: desiredUsername,
    error: null,
  };

  // @ts-ignore
  const [state, formAction] = useFormState(claimUsername, initialState);

  return (
    <form action={formAction}>
      <h1 className="text-4xl font-bold text-center select-none mb-6">
        Grab your username
      </h1>

      <div className="max-w-sm mx-auto">
        <input
          required
          name="username"
          defaultValue={desiredUsername}
          className="block p-2 outline-none mx-auto border w-full mb-2 text-center"
          type="text"
          placeholder="Username"
        />

        {/* <p aria-live="polite" className="text-sm text-red-600 mb-2 -mt-2">
          Username already taken.
        </p> */}

        <button
          className="bg-blue-500 text-white py-2 px-4 mx-auto w-full flex gap-2 items-center justify-center"
          type="submit"
        >
          <span>Claim this username</span>
          <RightIcons />
        </button>
      </div>
    </form>
  );
};

export default ClaimUsernameForm;
