import Page from "@/models/Page.model";
import Image from "next/image";
import { allButtons } from "@/data/linkButtons";
import { LinkButton, PageObject } from "@/../global";
import User from "@/models/User.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Link from "@/components/Link";
import PageAnalytic from "@/models/PageAnalytic.model";
import connectToDatabase from "@/app/libs/mongoosedb";

const linkPrefixes: any = {
  email: "mailto:",
  mobile: "tel:",
};

export default async function PublicPage({
  params,
}: Readonly<{
  params: { uri: string };
}>) {
  await connectToDatabase();
  const page: PageObject | null = await Page.findOne({ uri: params.uri });
  const user = await User.findOne({ email: page?.owner });
  await PageAnalytic.create({ uri: params.uri, type: "view" });

  return (
    <div className="min-h-screen bg-blue-950 text-white">
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
          const processedLink: string = linkPrefixes[key]
            ? `${linkPrefixes[key]}${link}`
            : link;
          const base64EncodedData = btoa(encodeURI(processedLink));

          return (
            <Link
              key={key}
              href={processedLink}
              target="_blank"
              analytics
              beaconData={{
                url: base64EncodedData,
                type: "click",
                uri: params.uri,
              }}
              classNames="rounded-full bg-white p-2 text-blue-600"
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

      <div className="mx-auto grid max-w-2xl grid-cols-1 place-items-center gap-2 p-4 sm:grid-cols-2 sm:gap-6">
        {page?.links.map((link: PageLink) => {
          const base64EncodedData = btoa(encodeURI(link.link));

          return (
            <Link
              key={link._id}
              href={link.link}
              target="_blank"
              analytics
              beaconData={{
                url: base64EncodedData,
                type: "click",
                uri: params.uri,
              }}
              classNames="flex w-full max-w-xs items-center rounded-md bg-indigo-900 p-2"
            >
              <div className="relative -left-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md bg-blue-700">
                {link.icon === "" ? (
                  <FontAwesomeIcon
                    fixedWidth
                    icon={faLink}
                    className="h-8 w-8"
                  />
                ) : (
                  <Image
                    fill
                    src={link.icon}
                    alt="link"
                    className="h-full w-full object-cover object-center"
                    sizes="33vw"
                  />
                )}
              </div>

              <div>
                <h3>{link.title}</h3>
                <p className="line-clamp-2 text-sm text-white/50">
                  {link.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
