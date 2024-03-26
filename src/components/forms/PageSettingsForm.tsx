import Image from "next/image";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
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

const PageSettingsForm: React.FC<{ page: any }> = async ({ page }) => {
  // @ts-ignore
  const session = await getServerSession(authOption);

  return (
    <form>
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
        <input id="nameInput" type="text" placeholder="John Doe" />

        <label htmlFor="locationInput">Location</label>
        <input
          id="locationInput"
          type="text"
          placeholder="Someplace in the world"
        />

        <label htmlFor="bioInput">Bio</label>
        <textarea id="bioInput" placeholder="Your Bio goes here..." />
      </div>
    </form>
  );
};

export default PageSettingsForm;
