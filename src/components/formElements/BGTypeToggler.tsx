"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToggleOption } from "@/../global";
import React, { useRef, useState } from "react";
import PlainLoader from "../loaders/PlainLoader";

const BGTypeToggler: React.FC<{
  togglerOptions: ToggleOption[];
  defaultChecked: string;
  defaultColor: string;
  setBgColor: React.Dispatch<React.SetStateAction<string>>;
  setBgImage: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({
  togglerOptions,
  defaultChecked,
  defaultColor,
  setBgColor,
  setBgImage,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const colorPickerRef = useRef<HTMLInputElement>(null);
  const imagePickerRef = useRef<HTMLInputElement>(null);

  const labelClick = (value: string) => () => {
    if (loading) return;
    if (value === "color") {
      colorPickerRef.current?.click();
    } else {
      imagePickerRef.current?.click();
    }
  };

  const fileUploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0] || null;
    if (
      selectedImage &&
      selectedImage.size <= 1024 * 1024 &&
      selectedImage.type.startsWith("image/")
    ) {
      const formData = new FormData();
      formData.set("file", selectedImage);

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
          setBgImage(data.url);
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
      setBgImage(null);
    }
  };

  return (
    <div className="toggler shadow">
      <PlainLoader message="Uploading Image..." loading={loading} />
      {togglerOptions.map((option) => {
        const { id, name, value, icon, iconClassName, fixedWidth, label } =
          option;

        return (
          <label key={id} onClick={labelClick(value)}>
            <input
              type="radio"
              name={name}
              value={value}
              defaultChecked={defaultChecked === value}
            />
            <div>
              <FontAwesomeIcon
                icon={icon}
                className={iconClassName}
                fixedWidth={fixedWidth}
              />
              <span>{label}</span>
            </div>
          </label>
        );
      })}

      <input
        name="bgColor"
        type="color"
        hidden
        ref={colorPickerRef}
        defaultValue={defaultColor}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setBgColor(e.target.value)
        }
      />
      <input
        name="bgImage"
        type="file"
        hidden
        ref={imagePickerRef}
        accept="image/*"
        onChange={fileUploadHandler}
      />
    </div>
  );
};

export default BGTypeToggler;
