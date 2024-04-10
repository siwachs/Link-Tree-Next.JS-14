import Link from "next/link";
import SignOut from "./buttons/SignOut";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/libs/authOptions";

const Header: React.FC = async () => {
  // @ts-ignore
  const session = await getServerSession(authOption);

  return (
    <header className="border-b bg-white py-4">
      <div className="mx-auto flex max-w-7xl justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="/" className="flex items-center gap-2 text-blue-700">
            <FontAwesomeIcon
              className="h-4 w-4 text-blue-500 sm:h-5 sm:w-5"
              icon={faLink}
            />
            <span className="text-sm font-bold sm:text-xl">LinkTree</span>
          </Link>

          <nav className="hidden gap-4 text-sm text-slate-500 sm:flex">
            <Link href="/about">About</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>

        <nav className="flex items-center gap-2.5 text-sm text-slate-500 sm:gap-4">
          {session ? (
            <>
              <Link className="select-none" href="/account">
                <span className="hidden md:inline">
                  Hello, {session.user?.name}
                </span>

                <span className="md:hidden">Account</span>
              </Link>
              <SignOut textClassName="hidden sm:inline" btnSize="h-4 w-4" />
            </>
          ) : (
            <Link href="/signin">Sign in</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
