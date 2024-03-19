import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b py-4">
      <div className="max-w-7xl mx-auto flex justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-blue-500 font-bold text-xl">
            LinkTree
          </Link>

          <nav className="flex gap-4 text-sm text-slate-500">
            <Link href="/about">About</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>

        <nav className="flex gap-4 text-sm text-slate-500">
          <Link href="/signin">Sign in</Link>
          <Link href="/register">Create Account</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
