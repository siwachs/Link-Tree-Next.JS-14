"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { DefaultSession } from "next-auth";
import { LinkButton, PageObject } from "@/../global";
import SectionBox from "../layouts/SectionBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactSortable } from "react-sortablejs";
import {
  faEnvelope,
  faPlus,
  faMobile,
  faClose,
  faSave,
  faGripLines,
} from "@fortawesome/free-solid-svg-icons";
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faStackOverflow,
  faTelegram,
  faTwitter,
  faWhatsapp,
  faSteam,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import SubmitForm from "../buttons/SubmitForm";
import { savePageButtons } from "@/actions/savePage";

const allButtons: LinkButton[] = [
  {
    key: "email",
    label: "E-Mail",
    icon: faEnvelope,
    type: "email",
    placeholder: "example@example.com",
  },
  {
    key: "mobile",
    label: "Mobile",
    icon: faMobile,
    type: "tel",
    placeholder: "+1234567890",
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: faInstagram,
    type: "text",
    placeholder: "https://www.instagram.com/your_username",
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: faFacebook,
    type: "text",
    placeholder: "https://www.facebook.com/your_username",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: faWhatsapp,
    type: "tel",
    placeholder: "https://wa.me/1234567890",
  },
  {
    key: "twitter",
    label: "Twitter",
    icon: faTwitter,
    type: "text",
    placeholder: "https://twitter.com/your_username",
  },
  {
    key: "telegram",
    label: "Telegram",
    icon: faTelegram,
    type: "text",
    placeholder: "https://t.me/your_username",
  },
  {
    key: "youtube",
    label: "Youtube",
    icon: faYoutube,
    type: "text",
    placeholder: "https://www.youtube.com/channel/your_channel_id",
  },
  {
    key: "discord",
    label: "Discord",
    icon: faDiscord,
    type: "text",
    placeholder: "https://discord.com/invite/your_invite_code",
  },
  {
    key: "stream",
    label: "Stream",
    icon: faSteam,
    type: "text",
    placeholder: "https://www.stream.com/your_username",
  },
  {
    key: "github",
    label: "GitHub",
    icon: faGithub,
    type: "text",
    placeholder: "https://github.com/your_username",
  },
  {
    key: "stackoverflow",
    label: "Stackoverflow",
    icon: faStackOverflow,
    type: "text",
    placeholder: "https://stackoverflow.com/users/your_user_id/your_username",
  },
];

const initialState = {
  error: false,
  errorMessage: "",
};

const PageButtonsForm: React.FC<{
  page: PageObject;
  session: DefaultSession;
}> = ({ page, session }) => {
  // @ts-ignore
  const [state, formAction] = useFormState(savePageButtons, initialState);

  // Mark Saved Buttons as already active
  const savedButtonsKeys = Object.keys(page?.buttons || {});
  const savedButtons: any = savedButtonsKeys
    .map((key) => allButtons.find((button) => button.key === key))
    .filter((button) => button !== undefined);

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

  return (
    <SectionBox classNames="-mt-6">
      <form
        action={formAction}
        className={`${state.error && "border border-red-500"}`}
      >
        <h2 className="mb-4 text-2xl font-bold">Buttons</h2>

        {/* @ts-ignore */}
        <ReactSortable list={activeButtons} setList={setActiveButtons}>
          {activeButtons.map((button) => (
            <label
              key={button.key}
              className="mb-4 flex items-center rounded-md border focus-within:border-blue-500"
            >
              <div className="flex w-48 items-center gap-2.5 p-2 text-gray-700">
                <FontAwesomeIcon
                  className="h-5 w-5 cursor-pointer text-gray-400"
                  fixedWidth
                  icon={faGripLines}
                />
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
                className="ml-2 flex-1 border border-none bg-gray-100 px-1 py-2 outline-none"
              />

              <button
                type="button"
                className="mx-2 flex items-center justify-center"
                onClick={() => {
                  setActiveButtons((prevButtons) =>
                    prevButtons.filter((btn) => btn.key !== button.key),
                  );
                }}
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
