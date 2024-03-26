"use client";

import { useFormStatus } from "react-dom";

const SubmitForm: React.FC<{
  children: React.ReactNode;
  classNames?: string;
}> = ({ children, classNames }) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      aria-disabled={pending}
      className={`mx-auto flex w-full items-center justify-center gap-2 bg-blue-500 px-4 py-2 text-white disabled:bg-blue-200 ${classNames}`}
    >
      {children}
    </button>
  );
};

export default SubmitForm;
