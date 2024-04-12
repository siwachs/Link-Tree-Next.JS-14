"use client";

import Image from "next/image";
import { DefaultSession } from "next-auth";
import {
  faCloudArrowUp,
  faImage,
  faPalette,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import BGTypeToggler from "../formElements/BGTypeToggler";

// @ts-ignore
import { ToggleOption, PageObject } from "@/../global";
import SubmitForm from "../buttons/SubmitForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormState } from "react-dom";
import { savePage } from "@/actions/savePage";
import { useState } from "react";
import SectionBox from "../layouts/SectionBox";

const togglerOptions: ToggleOption[] = [
  {
    id: "color",
    name: "bgType",
    value: "color",
    icon: faPalette,
    iconClassName: "h-4 w-4",
    fixedWidth: true,
    label: "Color",
  },
  {
    id: "image",
    name: "bgType",
    value: "image",
    icon: faImage,
    iconClassName: "h-4 w-4",
    fixedWidth: true,
    label: "Image",
  },
];

const initialState = {
  error: false,
  errorMessage: "",
};

const PageSettingsForm: React.FC<{
  page: PageObject;
  session: DefaultSession;
}> = ({ page, session }) => {
  // @ts-ignore
  const [state, formAction] = useFormState(savePage, initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [avatarImage, setAvatarImage] = useState<string>(session?.user?.image!);
  const [bgType, setBgType] = useState<"color" | "image">(page.bgType);
  const [bgImage, setBgImage] = useState<string>(page.bgImage);
  const [bgColor, setBgColor] = useState<string>(page.bgColor);

  const fileUploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const selectedImage = e.target.files?.[0] || null;
      if (
        selectedImage &&
        selectedImage.size <= 1024 * 1024 &&
        selectedImage.type.startsWith("image/")
      ) {
        const formData = new FormData();
        formData.set("name", e.target.name);
        formData.set("image", selectedImage);
        if (loading) return;

        setLoading(true);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (data.error) {
          alert(data.message);
        } else {
          setAvatarImage(data.url);
        }
      } else {
        // 1MB = 1024 KB and 1KB = 1024 Bytes so 1024 * 1024 Bytes
        alert(
          "Invalid File: File must be a image of size less than equal to 1MB.",
        );
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionBox>
      <form
        action={formAction}
        className={`${state.error && "border border-red-500"}`}
      >
        <div
          className="-m-4 flex h-96 items-center justify-center bg-cover bg-center"
          style={
            bgType === "color"
              ? { backgroundColor: bgColor }
              : {
                  backgroundImage: `url("${bgImage}")`,
                }
          }
        >
          <BGTypeToggler
            loading={loading}
            setLoading={setLoading}
            defaultChecked={bgType}
            togglerOptions={togglerOptions}
            defaultColor={bgColor}
            bgType={bgType}
            setBgType={setBgType}
            setBgColor={setBgColor}
            setBgImage={setBgImage}
          />
        </div>

        {/* Profile Picture */}
        <div className="-mb-12 flex justify-center">
          <div className="relative -top-8">
            <div className="relative h-[128px] w-[128px] overflow-hidden rounded-full border-4 border-white shadow shadow-black/50">
              <Image
                src={avatarImage}
                alt="avatar"
                fill
                className="h-full w-full object-cover object-center"
              />
            </div>

            <label className="absolute -right-2 bottom-0 flex aspect-square items-center rounded-full bg-white p-1 shadow-black/50">
              <FontAwesomeIcon fixedWidth size="xl" icon={faCloudArrowUp} />
              <input
                name="profileImage"
                hidden
                type="file"
                accept="image/*"
                onChange={fileUploadHandler}
              />
            </label>
          </div>
        </div>

        <div className="pageSettingsInputContainer">
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

          <SubmitForm loading={loading} classNames="max-w-xs mt-4">
            <FontAwesomeIcon fixedWidth icon={faSave} className="h-4 w-4" />
            <span>Save Page</span>
          </SubmitForm>

          {state.error && (
            <p aria-live="polite" className="text-sm text-red-600">
              {state.errorMessage}
            </p>
          )}
        </div>
      </form>
    </SectionBox>
  );
};

export default PageSettingsForm;
