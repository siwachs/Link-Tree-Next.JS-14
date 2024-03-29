import { DefaultSession, User } from "next-auth";
import { PageObject } from "../../../global";
import SectionBox from "../layouts/SectionBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPlus,
  faMobile,
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

const PageButtonsForm: React.FC<{
  page: PageObject;
  session: DefaultSession;
}> = ({ page, session }) => {
  const buttons: {
    key: string;
    label: string;
    icon: any;
  }[] = [
    { key: "email", label: "E-Mail", icon: faEnvelope },
    { key: "mobile", label: "Mobile", icon: faMobile },
    { key: "instagram", label: "Instagram", icon: faInstagram },
    { key: "facebook", label: "Facebook", icon: faFacebook },
    { key: "whatsapp", label: "WhatsApp", icon: faWhatsapp },
    { key: "twitter", label: "Twitter", icon: faTwitter },
    { key: "telegram", label: "Telegram", icon: faTelegram },
    { key: "youtube", label: "Youtube", icon: faYoutube },
    { key: "discord", label: "Discord", icon: faDiscord },
    { key: "stream", label: "Stream", icon: faSteam },
    { key: "github", label: "GitHub", icon: faGithub },
    { key: "stackoverflow", label: "Stackoverflow", icon: faStackOverflow },
  ];

  return (
    <SectionBox classNames="-mt-6">
      <h2 className="mb-4 text-2xl font-bold">Buttons</h2>
      <div className="flex flex-wrap gap-2">
        {buttons.map((button) => (
          <button
            key={button.key}
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
    </SectionBox>
  );
};

export default PageButtonsForm;
