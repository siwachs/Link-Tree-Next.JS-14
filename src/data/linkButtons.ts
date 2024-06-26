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
import { faEnvelope, faMobile } from "@fortawesome/free-solid-svg-icons";

// @ts-ignore
import { LinkButton } from "@/../global";

export const allButtons: LinkButton[] = [
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
