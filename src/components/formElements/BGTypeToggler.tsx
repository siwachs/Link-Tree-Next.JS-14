"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToggleOption } from "@/../global";
import { RefObject, useRef } from "react";

const BGTypeToggler: React.FC<{
  togglerOptions: ToggleOption[];
  defaultChecked: string;
  defaultColor: string;
}> = ({ togglerOptions, defaultChecked, defaultColor }) => {
  const colorPickerRef = useRef<HTMLInputElement>(null);
  const imagePickerRef = useRef<HTMLInputElement>(null);

  const labelClick = (value: string) => () => {
    if (value === "color") {
      colorPickerRef.current?.click();
    } else {
      imagePickerRef.current?.click();
    }
  };

  return (
    <div className="toggler shadow">
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
      />
      <input name="bgImage" type="file" hidden ref={imagePickerRef} />
    </div>
  );
};

export default BGTypeToggler;
