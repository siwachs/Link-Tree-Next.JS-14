"use client";

import claimUsername from "@/actions/claimUsername";
import { useFormState } from "react-dom";
import SubmitForm from "../buttons/SubmitForm";
import RightIcons from "../icons/RightIcons";

const initialState = {
  redirect: false,
  redirectTo: `/account`,
  error: false,
  errorMessage: "",
};

const ClaimUsernameForm: React.FC<{ desiredUsername: string }> = ({
  desiredUsername,
}) => {
  // @ts-ignore
  const [state, formAction] = useFormState(claimUsername, initialState);

  return (
    <form action={formAction}>
      <h1 className="mb-6 select-none pt-32 text-center text-4xl font-bold">
        Grab your username
      </h1>

      <div className="mx-auto max-w-sm">
        <input
          required
          aria-required="true"
          name="username"
          defaultValue={desiredUsername}
          className={`mx-auto mb-2 block w-full border p-2 text-center outline-none ${
            state.error && "border-red-500"
          }`}
          type="text"
          placeholder="Username"
        />

        {state.error && (
          <p aria-live="polite" className="-mt-2 text-sm text-red-600">
            {state.errorMessage}
          </p>
        )}

        <SubmitForm>
          <span>Claim this username</span>
          <RightIcons />
        </SubmitForm>
      </div>
    </form>
  );
};

export default ClaimUsernameForm;
