import Link from "next/link";
import Logout from "./buttons/Logout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const Header: React.FC = async () => {
  // @ts-ignore
  const session = await getServerSession(authOption);

  return (
    <header className="bg-white border-b py-4">
      <div className="max-w-7xl mx-auto flex justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-blue-700 flex items-center gap-2">
            <FontAwesomeIcon className="text-blue-500" icon={faLink} />
            <span className="font-bold text-xl">LinkTree</span>
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
              <Link href="/account">Hello, {session.user?.name}</Link>
              <Logout />
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
