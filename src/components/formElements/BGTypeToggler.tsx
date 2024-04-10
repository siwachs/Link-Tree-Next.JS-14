"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// @ts-ignore
import { ToggleOption } from "@/../global";
import PlainLoader from "../loaders/PlainLoader";
import { faCloudArrowUp, faPalette } from "@fortawesome/free-solid-svg-icons";

const BGTypeToggler: React.FC<{
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  togglerOptions: ToggleOption[];
  defaultChecked: string;
  defaultColor: string;
  bgType: "color" | "image";
  setBgType: React.Dispatch<React.SetStateAction<"color" | "image">>;
  setBgColor: React.Dispatch<React.SetStateAction<string>>;
  setBgImage: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  loading,
  setLoading,
  togglerOptions,
  defaultChecked,
  defaultColor,
  bgType,
  setBgType,
  setBgColor,
  setBgImage,
}) => {
  const fileUploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0] || null;
    if (
      selectedImage &&
      selectedImage.size <= 1024 * 1024 &&
      selectedImage.type.startsWith("image/")
    ) {
      const formData = new FormData();
      formData.set("name", e.target.name);
      formData.set("bgImage", selectedImage);

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
    }
  };

  return (
    <div>
      <div className="toggler shadow">
        <PlainLoader message="Uploading Image..." loading={loading} />

        {togglerOptions.map((option) => {
          const { id, name, value, icon, iconClassName, fixedWidth, label } =
            option;

          return (
            <label aria-label="color-image-picker" key={id}>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (loading) return;
                  setBgType(e.target.value as "color" | "image");
                }}
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
      </div>

      {bgType === "color" ? (
        <div className="flex justify-center">
          <label
            aria-label="color-picker"
            className="mt-2 flex gap-2 bg-white px-4 py-2 shadow"
          >
            <input
              hidden
              type="color"
              name="bgColor"
              defaultValue={defaultColor}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBgColor(e.target.value)
              }
            />
            <div className="flex cursor-pointer items-center gap-2">
              <FontAwesomeIcon
                fixedWidth
                icon={faPalette}
                className="h-6 w-6 text-gray-700"
              />
              <span>Change Color</span>
            </div>
          </label>
        </div>
      ) : (
        <div className="flex justify-center">
          <label
            aria-label="image-picker"
            className="mt-2 flex gap-2 bg-white px-4 py-2 shadow"
          >
            <input
              name="bgImage"
              hidden
              type="file"
              accept="image/*"
              onChange={fileUploadHandler}
            />
            <div className="flex cursor-pointer items-center gap-2">
              <FontAwesomeIcon
                fixedWidth
                icon={faCloudArrowUp}
                className="h-6 w-6 text-gray-700"
              />
              <span>Change image</span>
            </div>
          </label>
        </div>
      )}
    </div>
  );
};

export default BGTypeToggler;
