"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChartLine,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import SignOut from "@/components/buttons/SignOut";

const SidebarNav: React.FC = () => {
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname === path ? "active" : "";
  };

  return (
    <nav className="flex flex-col items-center gap-6">
      <Link href="/account" className={`sidebarLink ${isActive("/account")}`}>
        <FontAwesomeIcon fixedWidth icon={faFileLines} className="h-6 w-6" />
        <span>My Page</span>
      </Link>

      <Link
        href="/analytics"
        className={`sidebarLink ${isActive("/analytics")}`}
      >
        <FontAwesomeIcon fixedWidth icon={faChartLine} className="h-6 w-6" />
        <span>Analytics</span>
      </Link>

      <SignOut
        loadedBtnClassName="flex w-full items-center justify-center flex-row-reverse gap-4 text-gray-500"
        textClassName="text-gray-700"
        btnSize="w-6 h-6"
      />

      <Link
        href="/"
        className="flex w-full items-center justify-center gap-2 border-t pt-4 text-sm"
      >
        <FontAwesomeIcon fixedWidth icon={faArrowLeft} className="h-4 w-4" />
        <span className="text-gray-700">Back to Home</span>
      </Link>
    </nav>
  );
};

export default SidebarNav;
