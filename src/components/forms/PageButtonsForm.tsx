"use client";

import { useState } from "react";
import { useFormState } from "react-dom";

// @ts-ignore
import { PageObject, LinkButton } from "@/../global";
import SectionBox from "../layouts/SectionBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactSortable } from "react-sortablejs";
import {
  faPlus,
  faClose,
  faSave,
  faGripLines,
} from "@fortawesome/free-solid-svg-icons";
import SubmitForm from "../buttons/SubmitForm";
import { savePageButtons } from "@/actions/savePage";
import { allButtons } from "@/data/linkButtons";

const initialState = {
  error: false,
  errorMessage: "",
};

const PageButtonsForm: React.FC<{
  page: PageObject;
}> = ({ page }) => {
  // @ts-ignore
  const [state, formAction] = useFormState(savePageButtons, initialState);

  // Mark Saved Buttons as already active
  const savedButtonsKeys = Object.keys(page?.buttons || {});
  const savedButtons: any = savedButtonsKeys.map((key) =>
    allButtons.find((button) => button.key === key),
  );

  // Filter Out Available Buttons
  const [activeButtons, setActiveButtons] =
    useState<LinkButton[]>(savedButtons);
  const availableButtons = allButtons.filter(
    (button) =>
      !activeButtons.some((activeButton) => activeButton.key === button.key),
  );

  const addButtonToProfile = (button: LinkButton): void => {
    setActiveButtons((prevButtons) => [...prevButtons, button]);
  };

  const removeActiveButton = (button: LinkButton) => {
    setActiveButtons((prevButtons) =>
      prevButtons.filter((btn) => btn.key !== button.key),
    );
  };

  return (
    <SectionBox classNames="-mt-2 sm:-mt-6">
      <form
        action={formAction}
        className={`${state.error && "border border-red-500"}`}
      >
        <h2 className="mb-4 text-2xl font-bold">Buttons</h2>

        <ReactSortable
          handle=".grab"
          // @ts-ignore
          list={activeButtons}
          // @ts-ignore
          setList={setActiveButtons}
        >
          {activeButtons.map((button) => (
            <label
              aria-label={button.key}
              key={button.key}
              className="mb-4 flex items-center justify-between gap-2 rounded-md border px-1 focus-within:border-blue-500"
            >
              <FontAwesomeIcon
                className="grab h-5 w-5 cursor-move text-gray-400"
                fixedWidth
                icon={faGripLines}
              />

              <div className="flex flex-1 flex-col sm:flex-row">
                <div className="flex w-48 items-center gap-2.5 p-2 text-gray-700">
                  <FontAwesomeIcon
                    className="h-7 w-7"
                    fixedWidth
                    icon={button.icon}
                  />
                  <span className="select-none capitalize">{button.label}</span>
                </div>

                <input
                  defaultValue={page.buttons?.[button.key]}
                  name={button.key}
                  type={button.type}
                  placeholder={button.placeholder}
                  className="mb-1 ml-2 w-full flex-1 rounded-md border border-none bg-gray-100 px-1 py-2 outline-none sm:mb-0 sm:rounded-none"
                />
              </div>

              <button
                type="button"
                className="mx-2 flex items-center justify-center"
                onClick={() => removeActiveButton(button)}
              >
                <FontAwesomeIcon
                  className="h-7 w-7"
                  fixedWidth
                  icon={faClose}
                />
              </button>
            </label>
          ))}
        </ReactSortable>

        <div
          className={`flex flex-wrap gap-2 ${availableButtons.length !== 0 && "my-4 border-y py-4"}`}
        >
          {availableButtons.map((button) => (
            <button
              onClick={() => addButtonToProfile(button)}
              key={button.key}
              type="button"
              className="flex items-center gap-2 rounded-md bg-gray-300 p-2"
            >
              <FontAwesomeIcon
                className="h-6 w-6"
                fixedWidth
                icon={button.icon}
              />
              <span className="capitalize">{button.label}</span>
              <FontAwesomeIcon className="h-4 w-4" fixedWidth icon={faPlus} />
            </button>
          ))}
        </div>

        <SubmitForm classNames="max-w-xs mt-4">
          <FontAwesomeIcon fixedWidth icon={faSave} className="h-4 w-4" />
          <span>Save Buttons</span>
        </SubmitForm>

        {state.error && (
          <p aria-live="polite" className="text-sm text-red-600">
            {state.errorMessage}
          </p>
        )}
      </form>
    </SectionBox>
  );
};

export default PageButtonsForm;
