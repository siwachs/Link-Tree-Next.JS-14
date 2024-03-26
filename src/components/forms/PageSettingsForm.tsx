"use client";

import Image from "next/image";
import { DefaultSession } from "next-auth";
import { faImage, faPalette, faSave } from "@fortawesome/free-solid-svg-icons";
import BGTypeToggler from "../formElements/BGTypeToggler";
import { ToggleOption, PageObject } from "@/../global";
import SubmitForm from "../buttons/SubmitForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormState } from "react-dom";
import savePage from "@/actions/savePage";

const togglerOptions: ToggleOption[] = [
  {
    id: "color",
    name: "bg-type",
    value: "color",
    icon: faPalette,
    iconClassName: "h-4 w-4",
    fixedWidth: true,
    label: "Color",
  },
  {
    id: "width",
    name: "bg-type",
    value: "image",
    icon: faImage,
    iconClassName: "h-4 w-4",
    fixedWidth: true,
    label: "Image",
  },
];

const initialState = {};

const PageSettingsForm: React.FC<{
  page: PageObject;
  session: DefaultSession;
}> = ({ page, session }) => {
  // @ts-ignore
  const [state, formAction] = useFormState(savePage, initialState);

  return (
    <form action={formAction}>
      <div className="flex h-60 items-center justify-center bg-gray-300">
        <BGTypeToggler togglerOptions={togglerOptions} onChange={() => {}} />
      </div>

      <div className="-mb-8 flex justify-center">
        <Image
          src={session?.user?.image!}
          alt="avatar"
          width={128}
          height={128}
          className="relative -top-8 rounded-full border-4 border-white shadow shadow-black/50"
        />
      </div>

      <div className="pageSettingsInputContainer p-4">
        <label htmlFor="nameInput">Display Name</label>
        <input
          required
          aria-required="true"
          defaultValue={page.displayName}
          name="displayName"
          id="nameInput"
          type="text"
          placeholder="John Doe"
        />

        <label htmlFor="locationInput">Location</label>
        <input
          defaultValue={page.location}
          name="location"
          id="locationInput"
          type="text"
          placeholder="Someplace in the world"
        />

        <label htmlFor="bioInput">Bio</label>
        <textarea
          defaultValue={page.bio}
          name="bio"
          id="bioInput"
          placeholder="Your Bio goes here..."
        />

        <SubmitForm classNames="max-w-[200px]">
          <FontAwesomeIcon fixedWidth icon={faSave} className="h-4 w-4" />
          <span>Save Page</span>
        </SubmitForm>
      </div>
    </form>
  );
};

export default PageSettingsForm;
