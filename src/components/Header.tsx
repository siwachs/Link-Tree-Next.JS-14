import Link from "next/link";
import SignOut from "./buttons/SignOut";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const Header: React.FC = async () => {
  // @ts-ignore
  const session = await getServerSession(authOption);

  return (
    <header className="border-b bg-white py-4">
      <div className="mx-auto flex max-w-7xl justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-blue-700">
            <FontAwesomeIcon className="h-5 w-5 text-blue-500" icon={faLink} />
            <span className="text-xl font-bold">LinkTree</span>
          </Link>

          <nav className="flex gap-4 text-sm text-slate-500">
            <Link href="/about">About</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>

        <nav className="flex items-center gap-4 text-sm text-slate-500">
          {session ? (
            <>
              <Link className="select-none" href="/account">
                Hello, {session.user?.name}
              </Link>
              <SignOut btnSize="h-4 w-4" />
            </>
          ) : (
            <>
              <Link href="/signin">Sign in</Link>
              <Link href="/register">Create Account</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
