"use client";

import { PageLink, PageObject } from "@/../global";
import { useFormState } from "react-dom";
import SectionBox from "../layouts/SectionBox";
import { ReactSortable } from "react-sortablejs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowUp,
  faGripLines,
  faLink,
  faPlus,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
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

        <div className={`${links.length !== 0 && "my-4 border-b py-4"}`}>
          {/* @ts-ignore */}
          <ReactSortable list={links} setList={setLinks}>
            {links.map((link, index) => (
              <div
                key={index}
                className="pageLinksInputContainer mt-8 flex items-center gap-2"
              >
                <FontAwesomeIcon
                  fixedWidth
                  icon={faGripLines}
                  className="mr-2 h-6 w-6 rotate-90 cursor-pointer text-gray-700"
                />

                <div className="text-center">
                  <div className="inline-flex rounded-full bg-gray-300 p-2.5">
                    <FontAwesomeIcon
                      fixedWidth
                      icon={faLink}
                      className="h-6 w-6"
                    />
                  </div>
                  <button
                    type="button"
                    className="mt-1.5 flex items-center gap-2 rounded-md border p-1.5 text-gray-700"
                  >
                    <FontAwesomeIcon
                      fixedWidth
                      icon={faCloudArrowUp}
                      className="h-6 w-6"
                    />
                    <span> Change Icon</span>
                  </button>
                </div>

                <div className="pageLinksInputContainer flex-grow">
                  <input type="text" placeholder="Title" />
                  <input type="text" placeholder="Subtitle (Optional)" />
                  <input type="text" placeholder="Link" />
                </div>
              </div>
            ))}
          </ReactSortable>
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
