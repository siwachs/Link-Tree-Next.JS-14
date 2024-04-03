import Page from "@/models/Page.model.";
import Image from "next/image";
import { allButtons } from "@/data/linkButtons";
import { connect } from "mongoose";
import { LinkButton } from "@/../global";
import { PageObject } from "@/../global";
import User from "@/models/User.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const linkPrefixes: any = {
  email: "mailto:",
  mobile: "tel:",
};

export default async function PublicPage({
  params,
}: {
  params: { uri: string };
}) {
  await connect(process.env.MONGODB_URI!);
  const page: PageObject | null = await Page.findOne({ uri: params.uri! });
  const user = await User.findOne({ email: page?.owner });

  return (
    <div className="bg-blue-950 text-white">
      <div
        className="h-96 bg-cover bg-center"
        style={
          page?.bgType === "color"
            ? { backgroundColor: page?.bgColor }
            : {
                backgroundImage: `url("${page?.bgImage}")`,
              }
        }
      />
      <div className="relative -top-16 mx-auto -mb-12 h-36 w-36 overflow-hidden rounded-full">
        <Image
          src={user?.image}
          alt="profile-picture"
          fill
          className="h-full w-full object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <h2 className="mb-1 text-center text-2xl">{page?.displayName}</h2>
      <h3 className="flex items-center justify-center gap-2 text-base text-white/70">
        <FontAwesomeIcon fixedWidth className="h-4 w-4" icon={faLocationDot} />
        <span>{page?.location}</span>
      </h3>
      <div className="mx-auto my-2 max-w-sm text-center">
        <p>{page?.bio}</p>
      </div>

      <div className="mt-6 flex justify-center gap-2 pb-4">
        {Object.entries(page?.buttons)?.map(([key, value]) => {
          const button: LinkButton | undefined = allButtons.find(
            (button) => button.key === key,
          );
          const link = value as string;

          return (
            <Link
              key={key}
              href={linkPrefixes[key] ? `${linkPrefixes[key]}${link}` : link}
              target="_blank"
              className="rounded-full bg-white p-2 text-blue-600"
            >
              <FontAwesomeIcon
                fixedWidth
                className="h-6 w-6"
                icon={button?.icon}
              />
            </Link>
          );
        })}
      </div>

      <div>
        {page?.links.map((link) => (
          <Link key={link._id} href={link.link} target="_blank">
            <div>
              {link.icon === "" ? (
                <FontAwesomeIcon fixedWidth icon={faLink} size="xl" />
              ) : (
                <Image src={link.icon} alt="icon" />
              )}
            </div>
            <div>
              <h3>{link.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
