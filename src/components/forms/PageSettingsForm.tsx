import { faImage, faPalette } from "@fortawesome/free-solid-svg-icons";
import BGTypeToggler from "../formElements/BGTypeToggler";
import { ToggleOption } from "@/../global";

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

const PageSettingsForm: React.FC<{ page: any }> = ({ page }) => {
  return (
    <form>
      <div className="flex h-32 items-center justify-center bg-gray-300">
        <BGTypeToggler
          togglerOptions={togglerOptions}
          selected="color"
          onChange={() => {}}
        />
      </div>

      <div>Avatar</div>
    </form>
  );
};

export default PageSettingsForm;
