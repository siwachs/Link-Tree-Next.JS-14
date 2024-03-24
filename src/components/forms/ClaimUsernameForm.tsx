"use client";

import claimUsername from "@/actions/claimUsername";
import { useFormState } from "react-dom";
import { redirect } from "next/navigation";
import ClaimUsername from "../buttons/ClaimUsername";

const initialState = {
  redirect: false,
  redirectTo: `/account`,
  error: false,
};

const ClaimUsernameForm: React.FC<{ desiredUsername: string }> = ({
  desiredUsername,
}) => {
  // @ts-ignore
  const [state, formAction] = useFormState(claimUsername, initialState);
  if (state?.redirect) redirect(state?.redirectTo!);

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
          className={`block p-2 outline-none mx-auto border w-full mb-2 text-center ${
            state?.error && "border-red-500"
          }`}
          type="text"
          placeholder="Username"
        />

        {state?.error && (
          <p aria-live="polite" className="text-sm text-red-600 -mt-2">
            Username already taken.
          </p>
        )}

        <ClaimUsername />
      </div>
    </form>
  );
};

export default ClaimUsernameForm;
