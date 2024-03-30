"use client";

import { PageLink, PageObject } from "@/../global";
import { useFormState } from "react-dom";
import SectionBox from "../layouts/SectionBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import SubmitForm from "../buttons/SubmitForm";
import { useState } from "react";

const initialState = {
  error: false,
  errorMessage: "",
};

const PageLinksForm: React.FC<{ page: PageObject }> = ({ page }) => {
  // @ts-ignore
  const [state, formAction] = useFormState(() => {}, initialState);
  const [links, setLinks] = useState<PageLink[]>(page.links || []);

  const addNewLink = (): void => {
    setLinks((prev) => [
      ...prev,
      { title: "", subTitle: "", icon: "", link: "" },
    ]);
  };

  return (
    <SectionBox classNames="-mt-6">
      <form
        action={formAction}
        // className={`${state.error && "border border-red-500"}`}
      >
        <h2 className="mb-4 text-2xl font-bold">Links</h2>
        <button
          onClick={addNewLink}
          type="button"
          className="flex items-center gap-2 text-lg text-blue-500"
        >
          <FontAwesomeIcon
            fixedWidth
            icon={faPlus}
            className="h-5 w-5 rounded-full bg-blue-500 p-1 text-white"
          />
          <span>Add New</span>
        </button>

        <div className={`${links.length !== 0 && "my-4 border-y py-4"}`}>
          {links.map((link, index) => (
            <div key={index}></div>
          ))}
        </div>

        <SubmitForm classNames="max-w-xs mt-4">
          <FontAwesomeIcon fixedWidth icon={faSave} className="h-4 w-4" />
          <span>Save Links</span>
        </SubmitForm>

        {/* {state.error && (
          <p aria-live="polite" className="text-sm text-red-600">
            {state.errorMessage}
          </p>
        )} */}
      </form>
    </SectionBox>
  );
};

export default PageLinksForm;
