"use client";

import { useFormStatus } from "react-dom";

const SubmitForm: React.FC<{
  loading: boolean;
  children: React.ReactNode;
  classNames?: string;
}> = ({ loading, children, classNames }) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending || loading}
      type="submit"
      aria-disabled={pending || loading}
      className={`mx-auto flex w-full items-center justify-center gap-2 bg-blue-500 px-4 py-2 text-white disabled:bg-blue-200 ${classNames}`}
    >
      {children}
    </button>
  );
};

export default SubmitForm;
