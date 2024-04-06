"use client";

import NextLink from "next/link";

const Link: React.FC<{
  href: string;
  target?: string;
  children: React.ReactNode;
  analytics?: boolean;
  classNames?: string;
  beaconData?: {
    url: string;
    uri: string;
    type: "click" | "view";
  };
}> = ({ href, target, children, analytics, classNames, beaconData }) => {
  return (
    <NextLink
      href={href}
      target={target ? target : undefined}
      className={classNames}
      onClick={
        analytics && beaconData
          ? () => {
              navigator.sendBeacon("/api/click", JSON.stringify(beaconData));
            }
          : undefined
      }
    >
      {children}
    </NextLink>
  );
};

export default Link;
