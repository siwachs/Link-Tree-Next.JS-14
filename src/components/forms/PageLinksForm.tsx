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
import PlainLoader from "../loaders/PlainLoader";
import Image from "next/image";

const initialState = {
  error: false,
  errorMessage: "",
};

const PageLinksForm: React.FC<{ page: PageObject }> = ({ page }) => {
  // @ts-ignore
  const [state, formAction] = useFormState(() => {}, initialState);
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState<PageLink[]>(page.links || []);

  const addNewLink = (): void => {
    setLinks((prev) => [
      ...prev,
      {
        key: Date.now().toString(),
        title: "",
        subTitle: "",
        icon: "",
        link: "",
      },
    ]);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ): void => {
    const name = e.target.name;

    setLinks((prev) =>
      prev.map((link) =>
        link.key === key ? { ...link, [name]: e.target.value } : link,
      ),
    );
  };

  const fileUploadHandler = async (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    const selectedImage = e.target.files?.[0] || null;
    if (
      selectedImage &&
      selectedImage.size <= 1024 * 1024 &&
      selectedImage.type.startsWith("image/")
    ) {
      const formData = new FormData();
      formData.set("name", e.target.name);
      formData.set("link", selectedImage);

      setLoading(true);
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (data.error) {
          alert(data.message);
        } else {
          setLinks((prev) =>
            prev.map((link) =>
              link.key === key ? { ...link, icon: data.url } : link,
            ),
          );
        }
      } catch (error: any) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      // 1MB = 1024 KB and 1KB = 1024 Bytes so 1024 * 1024 Bytes
      alert(
        "Invalid File: File must be a image of size less than equal to 1MB.",
      );
    }
  };

  return (
    <SectionBox classNames="-mt-6">
      <PlainLoader message="Uploading Icon..." loading={loading} />
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

        {/* Links... */}
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
                  className="mr-2 h-6 w-6 rotate-90 cursor-move text-gray-700"
                />

                <div className="text-center">
                  <div className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-sm bg-gray-300">
                    {!link.icon ? (
                      <FontAwesomeIcon fixedWidth icon={faLink} size="xl" />
                    ) : (
                      <Image
                        fill
                        src={link.icon}
                        alt="link"
                        className="h-full w-full object-cover object-center"
                      />
                    )}
                  </div>
                  <input
                    name="link"
                    onChange={(e) => fileUploadHandler(e, link.key!)}
                    type="file"
                    hidden
                    id={link.key}
                    accept="image/*"
                  />
                  <label
                    htmlFor={link.key}
                    className="mt-1.5 flex cursor-pointer items-center gap-2 rounded-md border p-1.5 text-gray-700"
                  >
                    <FontAwesomeIcon
                      fixedWidth
                      icon={faCloudArrowUp}
                      className="h-6 w-6"
                    />
                    <span> Change Icon</span>
                  </label>
                </div>

                <div className="pageLinksInputContainer flex-grow">
                  <input
                    value={link.title}
                    name="title"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e, link.key!)
                    }
                    type="text"
                    placeholder="Title"
                  />
                  <input
                    value={link.subTitle}
                    name="subTitle"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e, link.key!)
                    }
                    type="text"
                    placeholder="Subtitle (Optional)"
                  />
                  <input
                    value={link.link}
                    name="link"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e, link.key!)
                    }
                    type="text"
                    placeholder="Link"
                  />
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>

        <SubmitForm loading={loading} classNames="max-w-xs mt-4">
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
