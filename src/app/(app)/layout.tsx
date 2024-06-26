import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import "../globals.css";
import { getServerSession } from "next-auth";
import { authOption } from "../libs/authOptions";
import SidebarNav from "@/components/layouts/SidebarNav";
import Page from "@/models/Page.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faLink } from "@fortawesome/free-solid-svg-icons";

// @ts-ignore
import { PageObject } from "@/../global";
import Link from "next/link";
import connectToDatabase from "../libs/mongoosedb";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Link Tree",
  description: "Generated by create next app",
};

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // @ts-ignore
  const session = await getServerSession(authOption);
  await connectToDatabase();
  const page: PageObject | null = await Page.findOne({
    owner: session?.user?.email,
  });

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="md:flex">
          <input id="menu-toggler" type="checkbox" hidden />
          <label
            htmlFor="menu-toggler"
            className="backdrop fixed inset-0 z-10 hidden bg-black/80 md:static"
            aria-label="Close Menu"
          />

          <label
            htmlFor="menu-toggler"
            className="ml-4 mt-4 inline-flex cursor-pointer select-none items-center justify-center gap-2 rounded-md bg-white p-2 shadow md:hidden"
          >
            <FontAwesomeIcon icon={faBars} className="h-4 w-4" />
            <span>Menu</span>
          </label>

          <aside
            id="menu"
            className="fixed -left-[100%] bottom-0 top-0 z-20 h-screen max-h-screen w-48 flex-shrink-0 overflow-auto bg-white p-4 pt-8 shadow transition-all md:static"
          >
            <div className="relative mx-auto mb-8 h-[128px] w-[128px] overflow-hidden rounded-full">
              <Image
                src={session?.user?.image!}
                alt="profile-picture"
                fill
                className="h-full w-full object-cover object-center"
              />
            </div>

            {/* Public Page NavLink */}
            {page && (
              <Link
                target="_blank"
                href={`/${page.uri}`}
                className="my-4 flex items-center justify-center gap-1"
              >
                <FontAwesomeIcon
                  size="lg"
                  className="text-blue-500"
                  icon={faLink}
                />
                <span className="text-xl text-gray-300">/</span>
                <span>{page.uri}</span>
              </Link>
            )}

            <SidebarNav />
          </aside>

          <main className="max-h-screen flex-grow overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
